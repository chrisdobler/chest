import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import rootReducer from './reducers';
import rootSaga from './sagas';
import { Item } from './types/item';

const initialState = {
    inventory: null as Array<Item> | null,
    editedItem: {
        photos: [],
        values: [],
    },
};

const sagaMiddleware = createSagaMiddleware();

export type IState = typeof initialState;

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger)
);

export default () => store;

sagaMiddleware.run(rootSaga);
