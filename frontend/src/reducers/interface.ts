import { Photo, Item, Tag } from '../types/item';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    height?: number;
    item?: Item;
}

export const interfaceInitialState = {
    listItemContainerPadding: 60,
    editorTagOptions: null as Tag[] | null,
};

export default (
    state: typeof interfaceInitialState = interfaceInitialState,
    payload: IPayload = { type: '' }
) => {
    switch (payload.type) {
        case actions.LIST_ITEMS_PADDING_TOP:
            return {
                ...state,
                listItemContainerPadding: payload.height ? payload.height : 60,
            };
        case actions.GET_ITEM_SINGLE_COMPLETE:
            return {
                ...state,
                ...(payload?.item?.tags
                    ? { editorTagOptions: payload.item.tags }
                    : { editorTagOptions: [] }),
            };
        default:
            return state;
    }
};
