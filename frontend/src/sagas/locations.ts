import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';

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
        `
    );
    const { data } = yield graphql.execute();

    yield put(
        inventoryActions.getLocationsComplete(
            data.locations || [{ error: data.message }]
        )
    );
}

export default { fetchLocations };
