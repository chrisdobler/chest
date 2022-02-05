import * as Types from '../types/item';
// src/actions/cart.js
export const addItemToInventory = (item: Types.Item) => {
    console.log('adding item:', item);
    return {
        type: 'addItem',
        item,
    };
};
