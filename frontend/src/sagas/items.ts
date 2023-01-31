import { put, all, take, fork } from 'redux-saga/effects';
// import gql from 'graphql-tag';
import FetchQL /* { FetchQLOptions } */ from 'fetchql';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import itemActions from '../actions/item';
import { Item, Photo } from '../types/item';
import { LocationType } from '../types/location';
import actions from '../constants/actions';
import allActions from '../actions';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

function* submitItem(item: Item, location: LocationType) {
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

    const removalList: string[] = [
        'photos',
        'tags',
        'location',
        'updatedAt',
        'createdAt',
    ];
    Object.keys(item)
        .filter((k) => !removalList.includes(k))
        .forEach((key) => {
            graphql.addMutation({
                name: key,
                variables: item[key as keyof Item],
            });
        });

    console.log(item.tags);
    item.tags &&
        graphql.addMutation({
            name: 'tags',
            noQuotes: true,
            variables: `[${item.tags
                .filter((tag) => tag.id)
                .map((tag) => tag.id as number)}]`,
        });

    // add location
    if (location)
        graphql.addMutation({
            name: 'locationId',
            variables: Number(location.id),
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

function* fetchItems(locationId?: number) {
    const graphql = new GraphQLClass({
        urlTag: 'items',
        apiUrl,
    });
    // await graphql.useAuth();
    // const args = { size: 5, date: new EnumTypeString(months) };
    graphql.addType(
        'items',
        { ...(locationId ? { locationId: Number(locationId) } : {}) },
        `
        id
        name
        updatedAt
        createdAt
        tags {
            id
            name
        }
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

function* fetchItemSingle(itemId: string) {
    const graphql = new GraphQLClass({
        urlTag: 'item',
        apiUrl,
    });
    if (itemId) {
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
            location {
                id
                name
            }
            tags {
                id
                name
            }
            photos {
                id
                src
            }
            `
        );
    }
    graphql.addType(
        `tags`,
        {},
        `
            id
            name
        `
    );
    const { data } = yield graphql.execute();


    // this it temporary, we don't want to fetch all tags at once CH-1
    yield put(allActions.addNewTagToEditor({ tags: data.tags }));
    if (data.item) yield put(itemActions.getItemComplete(data.item));

    // I don't think this is needed

    // else {
    //     const query = `
    //         {
    //             tags {
    //                 id
    //                 name
    //             }
    //         }
    //     `;
    //     const fetch = new FetchQL(graphql.options);
    //     const { data } = yield fetch.query({
    //         operationName: '',
    //         query,
    //         variables: {},
    //         opts: {
    //             omitEmptyVariables: true,
    //         },
    //     });
    //     yield put(itemActions.getItemComplete({ tags: data.tags }));
    // }
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
    yield graphql.mutate('deleteItem');
}

function* submitItemWatcher() {
    while (true) {
        const { item, location }: { item: Item; location: LocationType } =
            yield take(actions.SUBMIT_ITEM_TO_INVENTORY);
        yield fork(submitItem, item, location);
    }
}

function* deleteItemWatcher() {
    while (true) {
        const { itemId }: { itemId: number } = yield take(actions.DELETE_ITEM);
        yield fork(deleteItem, itemId);
    }
}

function* fetchItemsWatcher() {
    while (true) {
        const { locationId }: { locationId: number } = yield take(
            actions.GET_ITEMS
        );
        yield fork(fetchItems, locationId);
    }
}

function* fetchItemSingleWatcher() {
    while (true) {
        const { itemId }: { itemId: string } = yield take(
            actions.GET_ITEM_SINGLE
        );
        yield fork(fetchItemSingle, itemId);
    }
}

export default {
    fetchItemsWatcher,
    fetchItemSingleWatcher,
    deleteItemWatcher,
    submitItemWatcher,
};
