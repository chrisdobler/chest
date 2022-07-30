import actions from '../constants/actions';
import * as Types from '../types/item';
// src/actions/cart.js
const addPhotoToItem = (photo: Types.Photo) => ({
    type: 'addPhoto',
    photo,
});

const setItemProperty = (value: { key: string; value: string }) => ({
    type: actions.SET_ITEM_PROPERTY,
    ...value,
});

export default { setItemProperty, addPhotoToItem };
