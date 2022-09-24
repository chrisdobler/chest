import actions from '../constants/actions';

// src/actions/cart.js
const setLocationById = (locationId: number) => ({
    type: actions.SET_LOCATION_BY_ID,
    locationId,
});

export default {
    setLocationById,
};
