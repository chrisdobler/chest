// src/reducers/index.js
import { combineReducers } from 'redux';

import inventory from './inventory';
import editedItem from './editedItem';

const rootReducer = combineReducers({
    inventory,
    editedItem,
});
export default rootReducer;
