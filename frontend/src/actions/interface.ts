import actions from '../constants/actions';

const updateHeightOfEditor = (height: number) => ({
    type: actions.LIST_ITEMS_PADDING_TOP,
    height,
});

const getTagOptionsForString = (searchText: string) => ({
    type: actions.GET_TAG_OPTIONS_FOR_STRING,
    searchText,
});

export default { updateHeightOfEditor, getTagOptionsForString };
