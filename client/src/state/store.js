import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { fetchCurrenciesReducer } from './reducers/currenciesReducer';
import { socketReducer } from './reducers/socketReducer'

export const reducer = combineReducers({
    currencies: fetchCurrenciesReducer,
    socket: socketReducer
})

export const createAppStore = (state) => createStore(reducer, state, applyMiddleware(thunk));