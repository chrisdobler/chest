import { Photo, Item } from '../types/item';
import actions from '../constants/actions';

interface IState extends Item {}

export interface IPayload {
    type: string;
    value?: string | null;
    key: string;
    photo?: Photo;
    item?: Item;
}

export default (
    state: IState | null = {},
    payload: IPayload = { type: '', value: null, key: '' }
) => {
    switch (payload.type) {
        case actions.ADD_PHOTO:
            if (payload.photo)
                return {
                    ...state,
                    photos: [...(state?.photos || []), payload.photo],
                };
            return state;
        // case 'getPhotos':
        //     return state.photos;
        case actions.SET_ITEM_PROPERTY:
            return {
                ...state,
                [payload.key]: payload.value,
            };
        case actions.GET_ITEM_SINGLE_COMPLETE:
            return payload.item;
        case actions.SUBMIT_ITEM_TO_INVENTORY_COMPLETE:
            return null;
        default:
            return state;
    }
};
