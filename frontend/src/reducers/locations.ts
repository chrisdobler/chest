import { Photo, Item } from '../types/item';
import { LocationType } from '../types/location';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    locations?: LocationType[];
}

export default (
    state: LocationType[] = [],
    payload: IPayload = { type: '' }
) => {
    switch (payload.type) {
        case actions.GET_LOCATIONS_COMPLETE:
            return payload.locations;
        default:
            return state;
    }
};
