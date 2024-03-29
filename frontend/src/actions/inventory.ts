import Types from '../types';
import actions from '../constants/actions';

// src/actions/cart.js
const submitItemToInventory = (
    item: Types.Item,
    location: Types.LocationType | null
) => ({
    type: actions.SUBMIT_ITEM_TO_INVENTORY,
    item,
    location,
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

const getItems = (locationId: number | null = null) => {
    return {
        type: actions.GET_ITEMS,
        locationId,
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

// creates a new tag and adds it to the current item
const addNewTagToItem = (tagString: string) => ({
    type: actions.ADD_NEW_TAG_TO_ITEM,
    tagString,
});

export default {
    submitItemToInventory,
    submitItemToInventoryComplete,
    sendPhotosComplete,
    getItems,
    getItemsComplete,
    getLocations,
    getLocationsComplete,
    addNewTagToItem,
};
