import locationActions from './location';
import inventoryActions from './inventory';
import interfaceActions from './interface';
import itemActions from './item';
import Types from '../types';

import actions from '../constants/actions';

const addNewTagToEditor = ({
    tag,
    tags,
}: {
    tag?: Types.Tag;
    tags?: Types.Tag[];
}) => ({
    type: actions.ADD_TAG_OPTIONS_TO_EDITOR,
    tag,
    tags,
});

export default {
    ...locationActions,
    ...inventoryActions,
    ...interfaceActions,
    ...itemActions,
    addNewTagToEditor,
};
