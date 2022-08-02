import { Item } from '../types/item';
import actions from '../constants/actions';

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
        case actions.SUBMIT_ITEM_TO_INVENTORY_COMPLETE:
            if (payload?.item?.id)
                return [
                    ...(state?.filter(
                        (i) => payload.item && i.id !== payload.item.id
                    ) || []),
                    payload.item,
                ];
            return state;
        case actions.GET_ITEMS_COMPLETE:
            console.log(payload, state);
            if (payload.items) return [...payload.items];
            return state;
        default:
            return state;
    }
};
