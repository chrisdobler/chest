import * as Types from '../types/item';
// src/actions/cart.js
export const addPhotoToItem = (photo: Types.Photo) => {
    return {
        type: 'addPhoto',
        photo,
    };
};
