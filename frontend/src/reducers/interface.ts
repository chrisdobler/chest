import { Photo, Item } from '../types/item';
import actions from '../constants/actions';

interface IState extends Item {}

export interface IPayload {
    type: string;
    height?: number;
}

export default (
    state: IState | null = {},
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
