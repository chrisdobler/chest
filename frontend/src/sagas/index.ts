import {
    put,
    takeLatest,
    all,
    takeEvery,
    fork,
    take,
} from 'redux-saga/effects';
import { GraphQLClassInterface, GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
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
        urlTag: 'items',
        apiUrl: 'http://localhost:8000/graphql/',
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'item',
        {},
        `
        id
        `
    );
    Object.keys(item).forEach((key) => {
        graphql.addMutation({
            name: key,
            variables: item[key as keyof Item],
        });
    });
    const { data } = yield graphql.mutate('createItem');

    // yield put({
    //     type: 'ITEMS_RECEIVED',
    //     json: data.items || [{ error: data.message }],
    // });
    yield put(
        inventoryActions.submitItemToInventoryComplete({
            ...item,
            ...data.item,
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

function* fetchItemsWatcher() {
    yield takeLatest(actions.GET_ITEMS, fetchItems);
}

export default function* rootSaga() {
    yield all([fetchItemsWatcher(), fork(submitItemWatcher)]);
}
