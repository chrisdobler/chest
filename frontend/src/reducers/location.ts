import { Photo, Item } from '../types/item';
import { LocationType } from '../types/location';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    locations?: LocationType[];
    locationId?: number;
}

export const locationsInitialState = {
    allLocations: [] as LocationType[],
    selectedLocation: {} as LocationType | null,
};

export default (
    state: typeof locationsInitialState = locationsInitialState,
    payload: IPayload = { type: '' }
) => {
    const { locationId } = payload;
    let selectedLocation = null;
    switch (payload.type) {
        case actions.SET_LOCATION_BY_ID:
            selectedLocation =
                state.allLocations.find((loc) => loc.id === locationId) || null;
            return {
                ...state,
                selectedLocation,
            };
        case actions.GET_LOCATIONS_COMPLETE:
            return { ...state, allLocations: payload.locations || [] };
        default:
            return state;
    }
};
