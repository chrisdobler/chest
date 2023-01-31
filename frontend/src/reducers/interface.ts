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
    const tagsFilter = (tag: Tag) =>
        !state.editorTagOptions?.find(
            (existingTag) => existingTag.id === tag.id
        );
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
            };
        case actions.ADD_TAG_OPTIONS_TO_EDITOR:
            return {
                ...state,
                editorTagOptions: [
                    ...(state.editorTagOptions || []),
                    ...(payload.tag && tagsFilter(payload.tag)
                        ? [payload.tag as Tag]
                        : []),
                    ...(payload.tags ? payload.tags.filter(tagsFilter) : []),
                ],
            };
        default:
            return state;
    }
};
