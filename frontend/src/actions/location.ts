import actions from '../constants/actions';
import Types from '../types';

// src/actions/cart.js
const setLocationById = (locationId: number) => ({
    type: actions.SET_LOCATION_BY_ID,
    locationId,
});

const submitLocationToInventory = (location: Types.LocationType) => ({
    type: actions.SUBMIT_LOCATION_TO_INVENTORY,
    location,
});

const submitLocationToInventoryComplete = (location: Types.LocationType) => ({
    type: actions.SUBMIT_LOCATION_TO_INVENTORY_COMPLETE,
    location,
});

const deleteLocation = (locationId: number) => ({
    type: actions.DELETE_LOCATION,
    locationId,
});

export default {
    setLocationById,
    submitLocationToInventory,
    submitLocationToInventoryComplete,
    deleteLocation,
};
