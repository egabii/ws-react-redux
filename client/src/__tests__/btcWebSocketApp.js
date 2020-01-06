/*  TODO: TAKE A DEEP LOOK AT IT - NEED TO UNDERSTAND HOW TO TEST COMPONENT WITH INTEGRATION TEST APPROACH

import React from 'react'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import ReactDOM from 'react-dom';
import { render, screen, fireEvent, wait, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
//import { createAppStore } from '../state/store';
import { reducer } from '../state/store';
import { initialState as initialStateForCurrencies } from '../state/reducers/currenciesReducer';
import { BtcWebSocketApp } from '../containers/btcWebSocketApp';

/* 
    Test
        on change input number element
        on change input text value element (what if user types a non numeric value or special chars)
        on change select element
 *!/

 // this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState for the entire store that the ui is rendered with
function renderWithRedux(
  ui,
  { initialStateForCurrencies, store = createStore(reducer, {
    currencies: {...initialStateForCurrencies, data: [{"currency":"USD","symbol":"$"}]},
    socket: {}
  }, applyMiddleware(thunk)) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  }
}


/!*
test('can render with redux with defaults', async () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve()
  }));
  const { getByTestId } = renderWithRedux(<BtcWebSocketApp /> )


  await wait(() => {
    expect(getByTestId('select')).toHaveTextContent('USD');
  })
})
*/