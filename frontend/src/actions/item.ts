import * as Types from '../types/item';
// src/actions/cart.js
const addPhotoToItem = (photo: Types.Photo) => {
    return {
        type: 'addPhoto',
        photo,
    };
};

const setValues = (value: { key: string; value: string }) => ({
    type: 'setValue',
    value,
});

export default { setValues, addPhotoToItem };
