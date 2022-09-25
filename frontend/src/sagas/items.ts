import { put, all } from 'redux-saga/effects';
import { GraphQLClass } from '../utilities/graphql';
import inventoryActions from '../actions/inventory';
import itemActions from '../actions/item';
import { Item, Photo } from '../types/item';

const { REACT_APP_CHEST_API_URL } = process.env;
const apiUrl = `${REACT_APP_CHEST_API_URL}/graphql/`;

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
        photos {
            id
            src
        }
        `
    );
    const { data } = yield graphql.execute();
    yield put(itemActions.getItemComplete(data.item));
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

export default { fetchItems, fetchItemSingle, deleteItem, submitItem };
