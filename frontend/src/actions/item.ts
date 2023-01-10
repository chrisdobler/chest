import actions from '../constants/actions';
import * as Types from '../types/item';
import { Item } from '../types/item';
// src/actions/cart.js
const addPhotoToItem = (photo: Types.Photo) => ({
    type: actions.ADD_PHOTO,
    photo,
});

const sendPhoto = (photo: Types.Photo, itemId: number) => ({
    type: actions.SEND_PHOTO,
    photo,
    itemId,
});

const setItemProperty = (value: {
    key: string;
    value: string | Types.Tag[];
}) => ({
    type: actions.SET_ITEM_PROPERTY,
    ...value,
});

const deleteItem = (itemId: number) => ({
    type: actions.DELETE_ITEM,
    itemId,
});

// open an item for editing
const getItem = (itemId: number | null) => ({
    type: actions.GET_ITEM_SINGLE,
    itemId,
});

const getItemComplete = (item: Item, tags: Types.Tag[]) => ({
    type: actions.GET_ITEM_SINGLE_COMPLETE,
    item,
    tags,
});

const clearEditorFields = () => ({
    type: actions.CLEAR_EDITOR_FIELDS,
});

export default {
    setItemProperty,
    addPhotoToItem,
    sendPhoto,
    getItem,
    getItemComplete,
    deleteItem,
    clearEditorFields,
};
