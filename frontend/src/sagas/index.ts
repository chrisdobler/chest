import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import itemActions from '../actions/item';
import actions from '../constants/actions';
import { Item } from '../types/item';

function* fetchItems() {
    const graphql = new GraphQLClass({
        urlTag: 'items',
        apiUrl: 'http://localhost:8000/graphql/',
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
    // console.log(action);
    const graphql = new GraphQLClass({
        urlTag: 'sendItem',
        apiUrl: 'http://localhost:8000/graphql/',
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
    Object.keys(item).forEach((key) => {
        graphql.addMutation({
            name: key,
            variables: item[key as keyof Item],
        });
    });
    const { data } = yield graphql.mutate(item.id ? 'editItem' : 'createItem');
    yield put(
        inventoryActions.submitItemToInventoryComplete({
            ...item,
            ...(item.id ? data.editItem.item : data.createItem.item),
        })
    );
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
        apiUrl: 'http://localhost:8000/graphql/',
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
        apiUrl: 'http://localhost:8000/graphql/',
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

export default function* rootSaga() {
    yield all([
        fetchItemsWatcher(),
        fork(submitItemWatcher),
        fork(fetchItemSingleWatcher),
        fork(deleteItemWatcher),
    ]);
}
