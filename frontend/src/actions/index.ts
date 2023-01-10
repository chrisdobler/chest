import locationActions from './location';
import inventoryActions from './inventory';
import interfaceActions from './interface';
import itemActions from './item';
import Types from '../types';

import actions from '../constants/actions';

const addNewTagToItemComplete = (tag: Types.Tag) => ({
    type: actions.ADD_NEW_TAG_TO_ITEM_COMPLETE,
    tag,
});

export default {
    ...locationActions,
    ...inventoryActions,
    ...interfaceActions,
    ...itemActions,
    addNewTagToItemComplete,
};
