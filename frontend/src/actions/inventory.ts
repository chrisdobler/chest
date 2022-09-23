import * as Types from '../types/item';
import actions from '../constants/actions';
import { LocationType } from '../types/location';

// src/actions/cart.js
const submitItemToInventory = (item: Types.Item) => ({
    type: actions.SUBMIT_ITEM_TO_INVENTORY,
    item,
});

const submitItemToInventoryComplete = (item: Types.Item) => ({
    type: actions.SUBMIT_ITEM_TO_INVENTORY_COMPLETE,
    item,
});

const sendPhotosComplete = (photo: Types.Photo, itemId: number) => ({
    type: actions.SEND_PHOTO_COMPLETE,
    photo,
    itemId,
});

const getItems = (location: LocationType | null = null) => {
    return {
        type: actions.GET_ITEMS,
        location,
    };
};

const getItemsComplete = (items: Array<{}>) => ({
    type: actions.GET_ITEMS_COMPLETE,
    items,
});

const getLocations = () => ({
    type: actions.GET_LOCATIONS,
});

const getLocationsComplete = (locations: Array<{}>) => ({
    type: actions.GET_LOCATIONS_COMPLETE,
    locations,
});

export default {
    submitItemToInventory,
    submitItemToInventoryComplete,
    sendPhotosComplete,
    getItems,
    getItemsComplete,
    getLocations,
    getLocationsComplete,
};
