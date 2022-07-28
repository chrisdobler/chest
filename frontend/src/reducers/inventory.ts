import { Item } from '../types/item';

interface IPayload {
    type: string;
    item?: Item;
    items?: Item[];
}

export default (
    state: Array<Item> | null = null,
    payload: IPayload = { type: '' }
) => {
    switch (payload.type) {
        case 'addItem':
            if (payload.item) return [...(state || []), payload.item];
            return state;
        case 'GET_ITEMS_COMPLETE':
            console.log(payload, state);
            if (payload.items) return [...payload.items];
            return state;
        default:
            return state;
    }
};
