import { Photo } from '../types/item';

interface IState {
    photos: [];
    location: '';
    tags: [];
    values: [];
}

interface IPayload {
    photo: Photo;
    type: string;
}

export default (state: IState, payload: IPayload) => {
    switch (payload.type) {
        case 'addPhoto':
            return { ...state, photos: [...state.photos, payload.photo] };
        case 'getPhotos':
            return state.photos;
        case 'setValue':
            console.log(payload);
            return { ...state, values: [...state.values, payload.value] };
        default:
            return state;
    }
};
