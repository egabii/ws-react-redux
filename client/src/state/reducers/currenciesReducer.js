import produce from 'immer';

import {
    FETCH_CURRENCIES_PENDING,
    FETCH_CURRENCIES_FULFILLED,
    FETCH_CURRENCIES_REJECTED
} from '../actions/currenciesActions';

const initialState = {
    data: [],
    error: null,
    fetching: false,
    fetched: false,
    failed: false
};

export const fetchCurrenciesReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case FETCH_CURRENCIES_PENDING:
                draft.data = [];
                draft.error = null
                draft.fetched = false;
                draft.failed = false;
                draft.fetching = true;
                break;
            case FETCH_CURRENCIES_FULFILLED:
                draft.data = [...action.payload];
                draft.error = null
                draft.fetched = true;
                draft.failed = false;
                draft.fetching = false;
                break;
            case FETCH_CURRENCIES_REJECTED:
                draft.data = [];
                draft.error = action.payload
                draft.fetched = false;
                draft.failed = true;
                draft.fetching = false;
                break;
            default: 
                return draft;
        };
    });

}
