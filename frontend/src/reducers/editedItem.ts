import { Photo, Item } from '../types/item';

interface IState extends Item {}

interface IPayload {
    type: string;
    value?: string | null;
    photo?: Photo;
}

export default (
    state: IState = {},
    payload: IPayload = { type: '', value: null }
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
        // case 'setValue':
        //     console.log(payload);
        //     return {
        //         ...state,
        //         values: [...(state.values || []), payload.value],
        //     };
        default:
            return state;
    }
};
