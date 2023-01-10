import { put, takeLatest, all, fork, take } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import allActions from '../actions';
import actions from '../constants/actions';
import Types, { Tag } from '../types';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

function* submitTag(tagString: string) {
    console.log('hello');

    const graphql = new GraphQLClass({
        urlTag: 'sendTag',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'tag',
        {},
        `
        id
        name
        `
    );

    graphql.addMutation({
        name: 'name',
        variables: tagString,
    });

    const { data } = yield graphql.mutate('createTag');

    yield put(allActions.addNewTagToItemComplete(data.createTag.tag));
}

function* submitTagWatcher() {
    while (true) {
        const { tagString }: { tagString: string } = yield take(
            actions.ADD_NEW_TAG_TO_ITEM
        );
        yield fork(submitTag, tagString);
    }
}

export default [fork(submitTagWatcher)];
