import * as Types from '../types/item';
// src/actions/cart.js
export const addPhotoToItem = (photo: Types.Photo) => {
    console.log('adding photo to item:', photo);
    return {
        type: 'addPhoto',
        photo,
    };
};

export const setValues = (value: { key: string; value: string }) => ({
    type: 'setValue',
    value,
});
