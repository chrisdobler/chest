import { createStore } from 'redux';
import rootReducer from './reducers';
import { Item } from './types/item';

const initialState = {
    inventory: [] as Array<Item>,
    editedItem: {
        photos: [],
        values: [],
    },
};

export type IState = typeof initialState;

export default () => createStore(rootReducer, initialState);
