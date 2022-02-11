import { Item } from '../types/item';

interface IPayload {
    type: string;
    item?: Item;
}

export default (state: Array<Item> = [], payload: IPayload = { type: '' }) => {
    switch (payload.type) {
        case 'addItem':
            if (payload.item) return [...state, payload.item];
            return state;
        default:
            return state;
    }
};
