import { Item, Photo } from '../types/item';
import actions from '../constants/actions';

interface IPayload {
    type: string;
    item?: Item;
    items?: Item[];
    itemId?: number;
    photo?: Photo;
}

const stateMinusItem = (state: Array<Item>, id: number) => {
    if (!id) return state;
    return state?.filter((i) => id && i.id !== id) || [];
};

export default (
    state: Array<Item> | null = null,
    payload: IPayload = { type: '' }
) => {
    switch (payload.type) {
        case actions.SUBMIT_ITEM_TO_INVENTORY_COMPLETE:
            if (payload?.item)
                return [
                    ...stateMinusItem(state || [], payload.item.id || -1),
                    payload.item,
                ].sort(
                    (a, b) =>
                        new Date(b.updatedAt as string).getTime() -
                        new Date(a.updatedAt as string).getTime()
                );

            return state;
        case actions.SEND_PHOTO_COMPLETE:
            return (state || []).map((item) => {
                if (payload.itemId === item.id) {
                    let idMarked = false;
                    item.photos.map((photo: Photo) => {
                        // naively assume the first photo matches the current photo.
                        if (payload.photo && payload.photo.id && !idMarked) {
                            if (!photo.id) {
                                photo.id = payload.photo.id;
                                idMarked = true;
                            }
                        }
                        return photo;
                    });
                }
                return item;
            });
        case actions.GET_ITEMS_COMPLETE:
            console.log(payload, state);
            if (payload.items) return [...payload.items];
            return state;
        case actions.DELETE_ITEM:
            return stateMinusItem(state || [], payload.itemId || -1);
        default:
            return state;
    }
};
