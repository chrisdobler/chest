export default (state = [], payload = { type: '', item: '' }) => {
    switch (payload.type) {
        case 'addItem':
            return [...state, payload.item];
        default:
            return state;
    }
};
