import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
import thunk from 'redux-thunk';

const middleWares = [process.env.NODE_ENV !== 'development' && logger, thunk].filter(
    Boolean
)

const composeEnhansers = (process.env.NODE_ENV !== 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; 

const composedEnhansers = composeEnhansers(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhansers);