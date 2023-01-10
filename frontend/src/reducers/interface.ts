import { Item, Tag } from '../types/item';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    height?: number;
    item?: Item;
    tag?: Tag;
    tags?: Tag[];
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
            console.log(payload);
            return {
                ...state,
                ...(payload?.tags
                    ? { editorTagOptions: payload.tags }
                    : { editorTagOptions: [] }),
            };
        case actions.ADD_NEW_TAG_TO_ITEM_COMPLETE:
            return {
                ...state,
                editorTagOptions: [
                    ...(state.editorTagOptions || []),
                    payload.tag as Tag,
                ],
            };
        default:
            return state;
    }
};
