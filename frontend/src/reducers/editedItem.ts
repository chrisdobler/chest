export default (
    state = {
        photos: [],
        location: '',
        tags: [],
        values: [],
    },
    payload
) => {
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
