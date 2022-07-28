import { put, takeLatest, all } from 'redux-saga/effects';
import { GraphQLClassInterface, GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';


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

    yield put(inventoryActions.getItemsComplete(data.items));
}

function* actionWatcher() {
    yield takeLatest('GET_ITEMS', fetchItems);
}

export default function* rootSaga() {
    yield all([actionWatcher()]);
}
