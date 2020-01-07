import {fetchCurrenciesReducer as reducer, initialState} from '../../../state/reducers/currenciesReducer';
import {
    FETCH_CURRENCIES_PENDING,
    FETCH_CURRENCIES_FULFILLED,
    FETCH_CURRENCIES_REJECTED
} from '../../../state/actions/currenciesActions';


describe('Currencies reducers', () => {
    it('should return the initial state of currencies', () => {
        expect(reducer(undefined, {})).toEqual({
            ...initialState
        });
    });

    it('should return state for FETCH_CURRENCIES_PENDING', () => {
        expect(reducer(undefined, {
            type: FETCH_CURRENCIES_PENDING
        })).toEqual({
            ...initialState,
            fetching: true
        });
    });

    it('should return state for FETCH_CURRENCIES_FULFILLED', () => {
        const mock = [{ "currency": "USD", "symbol": "$" }];

        expect(reducer(undefined, {
            type: FETCH_CURRENCIES_FULFILLED,
            payload: mock
        })).toEqual({
            ...initialState,
            fetched: true,
            data: [...mock]
        });
    });

    it('should return state for FETCH_CURRENCIES_REJECTED', () => {
        const mockError = { "message": "Failed to fetch currencies" };

        expect(reducer(undefined, {
            type: FETCH_CURRENCIES_REJECTED,
            payload: mockError
        })).toEqual({
            ...initialState,
            failed: true,
            error: mockError
        });
    })
});