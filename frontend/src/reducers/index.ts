// src/reducers/index.js
import { combineReducers } from 'redux';

import inventory from './inventory';
import editedItem from './editedItem';
import interfaceVars from './interface';
import locations, { locationsInitialState } from './locations';
import { Item } from '../types/item';

const initialState = {
    inventory: null as Array<Item> | null,
    editedItem: null as unknown as Item | null,
    interfaceVars: { listItemContainerPadding: 60 },
    locations: locationsInitialState,
};

const rootReducer = combineReducers({
    inventory,
    editedItem,
    interfaceVars,
    locations,
});
export { rootReducer, initialState };
