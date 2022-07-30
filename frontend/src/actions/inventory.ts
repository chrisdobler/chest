import * as Types from '../types/item';
import actions from '../constants/actions';

// src/actions/cart.js
const submitItemToInventory = (item: Types.Item) => ({
    type: actions.SUBMIT_ITEM_TO_INVENTORY,
    item,
});

const submitItemToInventoryComplete = (item: Types.Item) => ({
    type: actions.SUBMIT_ITEM_TO_INVENTORY_COMPLETE,
    item,
});

const getItems = () => ({
    type: actions.GET_ITEMS,
});

const getItemsComplete = (items: Array<{}>) => ({
    type: actions.GET_ITEMS_COMPLETE,
    items,
});

export default {
    submitItemToInventory,
    submitItemToInventoryComplete,
    getItems,
    getItemsComplete,
};
