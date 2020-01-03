import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { fetchCurrenciesReducer } from './reducers/currenciesReducer';
import { socketReducer } from './reducers/socketReducer'

const reducer = combineReducers({
    currencies: fetchCurrenciesReducer,
    socket: socketReducer
})

export const createAppStore = () => {
    return createStore(reducer, applyMiddleware(thunk));
};