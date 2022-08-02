import actions from '../constants/actions';
import * as Types from '../types/item';
import { Item } from '../types/item';
// src/actions/cart.js
const addPhotoToItem = (photo: Types.Photo) => ({
    type: 'addPhoto',
    photo,
});

const setItemProperty = (value: { key: string; value: string }) => ({
    type: actions.SET_ITEM_PROPERTY,
    ...value,
});

const deleteItem = (itemId: number) => ({
    type: actions.DELETE_ITEM,
    itemId,
});

// open an item for editing
const getItem = (itemId: number) => ({
    type: actions.GET_ITEM_SINGLE,
    itemId,
});

const getItemComplete = (item: Item) => ({
    type: actions.GET_ITEM_SINGLE_COMPLETE,
    item,
});

export default {
    setItemProperty,
    addPhotoToItem,
    getItem,
    getItemComplete,
    deleteItem,
};
