import { Photo, Item } from '../types/item';
import actions from '../constants/actions';

interface IState extends Item {}

export interface IPayload {
    type: string;
    value?: string | null;
    key: string;
    photo?: Photo;
}

export default (
    state: IState = {},
    payload: IPayload = { type: '', value: null, key: '' }
) => {
    switch (payload.type) {
        case 'addPhoto':
            if (payload.photo)
                return {
                    ...state,
                    photos: [...(state.photos || []), payload.photo],
                };
            return state;
        // case 'getPhotos':
        //     return state.photos;
        case actions.SET_ITEM_PROPERTY:
            console.log(payload);
            return {
                ...state,
                [payload.key]: payload.value,
            };
        default:
            return state;
    }
};
