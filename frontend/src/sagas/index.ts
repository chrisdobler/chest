import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import actions from '../constants/actions';
import { Item, Photo } from '../types/item';

import itemsFetches from './items';
import locationsFetches from './locations';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

const { fetchItems, fetchItemSingle, deleteItem, submitItem } = itemsFetches;
const { fetchLocations } = locationsFetches;

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

function* submitItemWatcher() {
    while (true) {
        const { item }: { item: Item } = yield take(
            actions.SUBMIT_ITEM_TO_INVENTORY
        );
        yield fork(submitItem, item);
    }
}

function* deleteItemWatcher() {
    while (true) {
        const { itemId }: { itemId: number } = yield take(actions.DELETE_ITEM);
        yield fork(deleteItem, itemId);
    }
}

function* fetchItemsWatcher() {
    yield takeLatest(actions.GET_ITEMS, fetchItems);
}

function* fetchLocationsWatcher() {
    yield takeLatest(actions.GET_LOCATIONS, fetchLocations);
}

function* fetchItemSingleWatcher() {
    while (true) {
        const { itemId }: { itemId: string } = yield take(
            actions.GET_ITEM_SINGLE
        );
        yield fork(fetchItemSingle, itemId);
    }
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
        fetchLocationsWatcher(),
        fork(submitItemWatcher),
        fork(fetchItemSingleWatcher),
        fork(deleteItemWatcher),
        fork(sendPhotoWatcher),
    ]);
}
