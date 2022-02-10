import { createStore } from 'redux';
import rootReducer from './reducers';

const initialState = {
    inventory: [],
    editedItem: {
        photos: [],
        values: [],
    },
};

export type IState = typeof initialState;

export default () => createStore(rootReducer, initialState);
