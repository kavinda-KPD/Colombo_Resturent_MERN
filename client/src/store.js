import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getAllFoodsReducers } from './reducers/foodReducers';
import { cartReducer } from './reducers/cartReducer';

const finalReducer = combineReducers({
  getAllFoodsReducers: getAllFoodsReducers,
  cartReducer:cartReducer
});

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [];

const initialState = {
  cartReducer:{
    cartItems:cartItems
  }  
};

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;
