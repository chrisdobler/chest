import * as Types from '../types/item';
// src/actions/cart.js
const addItemToInventory = (item: Types.Item) => {
    console.log('adding item:', item);
    return {
        type: 'addItem',
        item,
    };
};

export default { addItemToInventory };
