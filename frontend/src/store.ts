import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import { rootReducer, initialState } from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export type IState = typeof initialState;

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger)
);

export default () => store;

sagaMiddleware.run(rootSaga);
