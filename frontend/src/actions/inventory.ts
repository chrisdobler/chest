import * as Types from '../types/item';
// src/actions/cart.js
const addItemToInventory = (item: Types.Item) => ({
    type: 'addItem',
    item,
});

const getItems = () => ({
    type: 'GET_ITEMS',
});

const getItemsComplete = (items: Array<{}>) => ({
    type: 'GET_ITEMS_COMPLETE',
    items,
});

export default { addItemToInventory, getItems, getItemsComplete };
