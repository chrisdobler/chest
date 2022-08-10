import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import itemActions from '../actions/item';
import actions from '../constants/actions';
import { Item, Photo } from '../types/item';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

function* fetchItems() {
    const graphql = new GraphQLClass({
        urlTag: 'items',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'items',
        {},
        `
        id
        name
        updatedAt
        createdAt
        photos {
            id
            src
        }
        `
    );
    const { data } = yield graphql.execute();

    yield put(
        inventoryActions.getItemsComplete(
            data.items || [{ error: data.message }]
        )
    );
}

function* submitItem(item: Item) {
    const graphql = new GraphQLClass({
        urlTag: 'sendItem',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'item',
        {},
        `
        id
        updatedAt
        createdAt
        `
    );
    if (item.id) item.id = +item.id;
    delete item.updatedAt;
    delete item.createdAt;
    const removalList: string[] = ['photos'];
    Object.keys(item)
        .filter((k) => !removalList.includes(k))
        .forEach((key) => {
            graphql.addMutation({
                name: key,
                variables: item[key as keyof Item],
            });
        });
    const { data } = yield graphql.mutate(item.id ? 'editItem' : 'createItem');

    const receivedItem = item.id ? data.editItem.item : data.createItem.item;

    // submit photos
    yield all(
        item.photos.map(function* (photo: Photo) {
            if (!photo.id) {
                yield put(itemActions.sendPhoto(photo, receivedItem.id));
            }
            return photo;
        })
    );

    yield put(
        inventoryActions.submitItemToInventoryComplete({
            ...item,
            ...receivedItem,
        })
    );
}

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

function* deleteItem(itemId: number) {
    const graphql = new GraphQLClass({
        urlTag: 'deleteItem',
        apiUrl,
    });
    graphql.addType('item', {}, `id`);
    graphql.addMutation({
        name: 'id',
        variables: itemId || -1,
    });
    const { data } = yield graphql.mutate('deleteItem');
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

function* fetchItemSingle(itemId: string) {
    const graphql = new GraphQLClass({
        urlTag: 'item',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        `item(id: ${itemId})`,
        {},
        `
        id
        name
        updatedAt
        createdAt
        photos {
            id
            src
        }
        `
    );
    const { data } = yield graphql.execute();
    yield put(itemActions.getItemComplete(data.item));
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
        fork(submitItemWatcher),
        fork(fetchItemSingleWatcher),
        fork(deleteItemWatcher),
        fork(sendPhotoWatcher),
    ]);
}
