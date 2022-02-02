// src/reducers/index.js
import inventory from './inventory';
import editedItem from './editedItem';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    inventory,
    editedItem,
});
export default rootReducer;
