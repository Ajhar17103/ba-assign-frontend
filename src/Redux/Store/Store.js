// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import hotelReducer from '../Hotels/reducer';


const store = createStore(hotelReducer, applyMiddleware(thunk));

export default store;
