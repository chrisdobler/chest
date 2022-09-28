import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import allActions from '../actions';
import actions from '../constants/actions';
import Types from '../types';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

function* fetchLocations() {
    const graphql = new GraphQLClass({
        urlTag: 'locations',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'locations',
        {},
        `
        id
        name
        updatedAt
        createdAt
        `
    );
    const { data } = yield graphql.execute();

    yield put(
        inventoryActions.getLocationsComplete(
            data.locations || [{ error: data.message }]
        )
    );
}

function* submitLocation(location: Types.LocationType) {
    const graphql = new GraphQLClass({
        urlTag: 'sendLocation',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'location',
        {},
        `
        id
        updatedAt
        createdAt
        `
    );
    if (location.id) location.id = +location.id;
    delete location.updatedAt;
    delete location.createdAt;
    const removalList: string[] = ['photos'];
    Object.keys(location)
        .filter((k) => !removalList.includes(k))
        .forEach((key) => {
            graphql.addMutation({
                name: key,
                variables: location[key as keyof Types.LocationType] || '',
            });
        });

    const { data } = yield graphql.mutate(
        location.id ? 'editLocation' : 'createLocation'
    );

    const receivedLocation = location.id
        ? data.editLocation.location
        : data.createLocation.location;

    // submit photos
    // yield all(
    //     location.photos.map(function* (photo: Photo) {
    //         if (!photo.id) {
    //             yield put(locationActions.sendPhoto(photo, receivedItem.id));
    //         }
    //         return photo;
    //     })
    // );

    yield put(
        allActions.submitLocationToInventoryComplete({
            ...location,
            ...receivedLocation,
        })
    );
}

function* submitLocationWatcher() {
    while (true) {
        const { location }: { location: Types.LocationType } = yield take(
            actions.SUBMIT_LOCATION_TO_INVENTORY
        );
        yield fork(submitLocation, location);
    }
}

function* deleteLocation(locationId: number) {
    const graphql = new GraphQLClass({
        urlTag: 'deleteLocation',
        apiUrl,
    });
    graphql.addType('location', {}, `id`);
    graphql.addMutation({
        name: 'id',
        variables: +locationId || -1,
    });
    const { data } = yield graphql.mutate('deleteLocation');
}

function* deleteLocationWatcher() {
    while (true) {
        const { locationId }: { locationId: number } = yield take(
            actions.DELETE_LOCATION
        );
        yield fork(deleteLocation, locationId);
    }
}

export default {
    fetchLocations,
    submitLocation,
    submitLocationWatcher,
    deleteLocationWatcher,
};
