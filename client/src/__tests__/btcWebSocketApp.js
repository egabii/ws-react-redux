/*  TODO: TAKE A DEEP LOOK AT IT - NEED TO UNDERSTAND HOW TO TEST COMPONENT WITH INTEGRATION TEST APPROACH */

import React from 'react'
import { Provider } from 'react-redux';
///
import axios from 'axios';
import io from 'socket.io-client';
///
import { render, fireEvent, wait, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
////
import { createAppStore } from '../state/store';
import { initialState as initialStateForCurrencies } from '../state/reducers/currenciesReducer';
import { initialState as initialStateForSocket } from '../state/reducers/socketReducer';
import { BtcWebSocketApp } from '../containers/btcWebSocketApp';

/* 
    Test
        on change input number element
        on change input text value element (what if user types a non numeric value or special chars)
        on change select element
 */
jest.mock('axios');
jest.mock('socket.io-client');

const initialState = {
    currencies: { ...initialStateForCurrencies },
    socket: { ...initialStateForSocket }
};

const mockSocketResponse = {
    'BRL': {
        15000: '0.91233',
        25000: '1.92323'
    },
    'USD': {
        15000: '2.822123',
        25000: '3.245677'
    }
};

afterEach(cleanup);

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
function renderWithRedux(
    component,
    { initialState, store = createAppStore(initialState) } = {}
) {
    return {
        ...render(<Provider store={store}>{component}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

beforeEach(() => {
    axios.get.mockResolvedValue({ data: [{ "currency": "USD", "symbol": "$" }, { "currency": "BRL", "symbol": "R$" }] });

    io.connect.mockReturnValue({
        emit: (eventName, opts, cb) => {
            switch (eventName) {
                case 'fetch_currency': {
                    return cb({
                        status: 'success',
                        data: {
                            data: mockSocketResponse[opts.currency][opts.value]
                        }
                    });
                }

                case 'disconnect':
                    return { connect: false }
                default:
                    return { connect: true }
            }
        }
    });
});

test('Should be able to run with default values', async () => {
    const { getByTestId, queryByText } = renderWithRedux(<BtcWebSocketApp />);

    expect(queryByText('...LOADING')).toBeInTheDocument();

    await wait(() => {
        expect(getByTestId('select')).toHaveTextContent('USD');
        expect(getByTestId('input-inputValue').value).toBe('15000');
        expect(getByTestId('input-delayTime').value).toBe('5');
        expect(getByTestId('content')).toHaveTextContent(/2.82/i);
    })
});

test('should be able to change currency from select', async () => {
    const { getByTestId, queryByText } = renderWithRedux(<BtcWebSocketApp />);

    expect(queryByText('...LOADING')).toBeInTheDocument();

    await wait(() => {
        expect(getByTestId('select')).toHaveTextContent('USD');
        fireEvent.change(getByTestId('select'), { target: { value: JSON.stringify({ "currency": "BRL", "symbol": "R$" }) } })
        expect(getByTestId('select')).toHaveTextContent('BRL');
        expect(getByTestId('content')).toHaveTextContent(/R\$ 0.9/i);
    })
});

test('should be able to change input value', async () => {

    const { getByTestId, queryByText } = renderWithRedux(<BtcWebSocketApp />);

    expect(queryByText('...LOADING')).toBeInTheDocument();

    await wait(() => {
        expect(getByTestId('input-inputValue').value).toBe('15000');
        fireEvent.change(getByTestId('input-inputValue'), { target: { value: '25000' } })
        expect(getByTestId('input-inputValue').value).toBe('25000');
        expect(getByTestId('content')).toHaveTextContent(/\$ 3.25/i);
    });
});
