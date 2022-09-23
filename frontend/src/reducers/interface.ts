import { Photo, Item } from '../types/item';
import actions from '../constants/actions';

export interface IPayload {
    type: string;
    height?: number;
}

export const interfaceInitialState = {
    listItemContainerPadding: 60,
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
        default:
            return state;
    }
};
