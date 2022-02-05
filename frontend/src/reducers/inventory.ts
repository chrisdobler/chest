export default (state = [], payload) => {
    switch (payload.type) {
        case 'addItem':
            return [...state, payload.item];
        default:
            return state;
    }
};
