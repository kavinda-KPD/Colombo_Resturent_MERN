import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getAllFoodsReducers } from './reducers/foodReducers';

const finalReducer = combineReducers({
  getAllFoodsReducers: getAllFoodsReducers
});

const initialState = {};

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
