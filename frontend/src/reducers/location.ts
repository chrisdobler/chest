import { Photo, Item } from '../types/item';
import { LocationType } from '../types/location';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    locations?: LocationType[];
    location?: LocationType;
    locationId?: number;
    key: string;
    value: string | number;
}

export const locationsInitialState = {
    allLocations: [] as LocationType[],
    selectedLocation: {} as LocationType | null,
};

const stateMinusLocation = (state: Array<LocationType>, id: number) => {
    if (!id) return state;
    return state?.filter((i) => id && i.id !== id) || [];
};

export default (
    state: typeof locationsInitialState = locationsInitialState,
    payload: IPayload = { type: '', key: '', value: '' }
) => {
    const { locationId } = payload;
    let selectedLocation = null;
    switch (payload.type) {
        case actions.SET_LOCATION_BY_ID:
            if (locationId !== -1)
                selectedLocation = state.allLocations.find(
                    (loc) => Number(loc.id) === Number(locationId)
                ) || { id: locationId };
            return {
                ...state,
                selectedLocation,
            };
        case actions.GET_LOCATIONS_COMPLETE:
            return { ...state, allLocations: payload.locations || [] };
        case actions.SET_LOCATION_PROPERTY:
            return {
                ...state,
                selectedLocation: {
                    ...state.selectedLocation,
                    [payload.key]: payload.value,
                },
            };
        case actions.SUBMIT_LOCATION_TO_INVENTORY_COMPLETE:
            if (payload?.location)
                return {
                    ...state,
                    allLocations: [
                        ...stateMinusLocation(
                            state.allLocations || [],
                            payload.location.id || -1
                        ),
                        payload.location,
                    ].sort(
                        (a, b) =>
                            new Date(b.updatedAt as string).getTime() -
                            new Date(a.updatedAt as string).getTime()
                    ),
                    selectedLocation: payload.location,
                };

            return state;
        case actions.DELETE_LOCATION:
            return {
                ...state,
                allLocations: [
                    ...stateMinusLocation(
                        state.allLocations || [],
                        payload.locationId || -1
                    ),
                ],
                selectedLocation: null,
            };
        default:
            return state;
    }
};
