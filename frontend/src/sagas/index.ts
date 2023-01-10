import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import actions from '../constants/actions';
import { Photo } from '../types/item';

import itemsFetches from './items';
import locationsFetches from './locations';
import inventoryFetches from './inventory';

// import { LocationType } from '../types/location';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

const {
    fetchItemsWatcher,
    fetchItemSingleWatcher,
    deleteItemWatcher,
    submitItemWatcher,
} = itemsFetches;
const { fetchLocations, submitLocationWatcher, deleteLocationWatcher } =
    locationsFetches;

function* sendPhoto(photo: Photo, itemId: number) {
    const graphql = new GraphQLClass({
        urlTag: 'sendPhoto',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType('photo', {}, ` id `);
    graphql.addMutation({
        name: 'file',
        variables: '$file',
        noQuotes: true,
    });
    graphql.addMutation({
        name: 'itemId',
        variables: itemId,
    });
    const { data } = yield graphql.mutate('addPhoto', [photo.src as string]);
    // if (data.addPhoto.success) {
    yield put(
        inventoryActions.sendPhotosComplete(
            { ...photo, id: data.addPhoto.photo.id },
            itemId
        )
    );
    // }
}

function* fetchLocationsWatcher() {
    yield takeLatest(actions.GET_LOCATIONS, fetchLocations);
}

function* sendPhotoWatcher() {
    while (true) {
        const { photo, itemId }: { photo: Photo; itemId: number } = yield take(
            actions.SEND_PHOTO
        );
        yield fork(sendPhoto, photo, itemId);
    }
}

export default function* rootSaga() {
    yield all([
        fetchItemsWatcher(),
        fork(submitItemWatcher),
        fork(fetchItemSingleWatcher),
        fork(deleteItemWatcher),
        fork(sendPhotoWatcher),

        fetchLocationsWatcher(),
        fork(submitLocationWatcher),
        fork(deleteLocationWatcher),

        ...inventoryFetches,
    ]);
}
