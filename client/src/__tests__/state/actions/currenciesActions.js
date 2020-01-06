import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchCurrenciesAction } from '../../../state/actions/currenciesActions'
import {
    FETCH_CURRENCIES_PENDING,
    FETCH_CURRENCIES_FULFILLED,
     FETCH_CURRENCIES_REJECTED
} from '../../../state/actions/currenciesActions';
import axios from 'axios';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('async actions', () => {

    it('FETCH_CURRENCIES_FULFILLED when fetching currencies has been done', (done) => {
        const mock = [{ "currency": "USD", "symbol": "$" }];
        const store = mockStore({
            currencies: {
                data: [],
                error: null,
                fetching: false,
                fetched: false,
                failed: false
            }
        });

        axios.get.mockResolvedValue({ data: mock });

        const expectedActions = [
            { type: FETCH_CURRENCIES_PENDING },
            { type: FETCH_CURRENCIES_FULFILLED, payload: mock }
        ]

        store.dispatch(fetchCurrenciesAction());

        store.subscribe(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('FETCH_CURRENCIES_REJECT when fetching currencies has been done', (done) => {
        const store = mockStore({
            currencies: {
                data: [],
                error: null,
                fetching: false,
                fetched: false,
                failed: false
            }
        });

        axios.get.mockRejectedValue({ error: new Error() });

        const expectedActions = [
            { type: FETCH_CURRENCIES_PENDING },
            { type: FETCH_CURRENCIES_REJECTED, payload: { message: 'Failed to fetch currencies' } }
        ]

        store.dispatch(fetchCurrenciesAction());

        store.subscribe(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
})
