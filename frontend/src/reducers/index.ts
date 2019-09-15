// src/reducers/index.js
import inventory from './inventory';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  inventory
});
export default rootReducer;
