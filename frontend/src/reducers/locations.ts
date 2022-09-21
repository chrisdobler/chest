import { Photo, Item } from '../types/item';
import { LocationType } from '../types/location';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    locations?: LocationType[];
    selectedLocation?: LocationType;
}

export const locationsInitialState = {
    allLocations: [] as LocationType[],
    selectedLocation: {} as LocationType | null,
};

export default (
    state: typeof locationsInitialState = locationsInitialState,
    payload: IPayload = { type: '' }
) => {
    switch (payload.type) {
        case actions.SET_LOCATION:
            return {
                ...state,
                selectedLocation: payload.selectedLocation || null,
            };
        case actions.GET_LOCATIONS_COMPLETE:
            return { ...state, allLocations: payload.locations || [] };
        default:
            return state;
    }
};
