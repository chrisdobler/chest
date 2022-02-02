export default (
    state = {
        photos: [],
        location: '',
        tags: [],
    },
    payload
) => {
    switch (payload.type) {
        case 'addPhoto':
            return { ...state, photos: [...state.photos, payload.photo] };
        case 'getPhotos':
            return state.photos;
        default:
            return state;
    }
};
