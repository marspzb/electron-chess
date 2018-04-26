import { AppState } from './state';
import { createStore, applyMiddleware, compose } from 'redux';
import { Store } from 'react-redux';
//import thunk from 'redux-thunk';
import {chessAppReducer} from '../reducers/index';


/* Use this for all environments */
//const middleware = applyMiddleware(promiseMiddleware(), thunk);

const middleware =null;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<AppState> = createStore<AppState>(chessAppReducer);

