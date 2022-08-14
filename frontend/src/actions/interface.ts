import actions from '../constants/actions';
import * as Types from '../types/item';
import { Item } from '../types/item';
// src/actions/cart.js
const updateHeightOfEditor = (height: number) => ({
    type: actions.LIST_ITEMS_PADDING_TOP,
    height,
});

export default { updateHeightOfEditor };
