import * as Types from '../types/item';
// src/actions/cart.js
const addItemToInventory = (item: Types.Item) => ({
    type: 'addItem',
    item,
});

export default { addItemToInventory };
