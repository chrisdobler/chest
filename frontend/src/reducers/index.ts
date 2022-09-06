// src/reducers/index.js
import { combineReducers } from 'redux';

import inventory from './inventory';
import editedItem from './editedItem';
import interfaceVars from './interface';
import locations from './locations';
import { Item } from '../types/item';
import { LocationType } from '../types/location';

const initialState = {
    inventory: null as Array<Item> | null,
    editedItem: null as unknown as Item | null,
    interfaceVars: { listItemContainerPadding: 60 },
    locations: [] as LocationType[],
};

const rootReducer = combineReducers({
    inventory,
    editedItem,
    interfaceVars,
    locations,
});
export { rootReducer, initialState };
