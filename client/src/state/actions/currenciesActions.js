
import { fetchCurrencies } from '../../providers/btcService';

export const FETCH_CURRENCIES_PENDING = 'FETCH_CURRENCIES_PENDING';
export const FETCH_CURRENCIES_FULFILLED = 'FETCH_CURRENCIES_FULFILLED';
export const FETCH_CURRENCIES_REJECTED = 'FETCH_CURRENCIES_REJECTED';


const loadingHandlerAction = () => {
    return { type: FETCH_CURRENCIES_PENDING }
};

const successHandlerAction = (data) => {
    return {
        type: FETCH_CURRENCIES_FULFILLED,
        payload: data
    }
};

const errorHandlerAction = (error) => {
    return {
        type: FETCH_CURRENCIES_REJECTED,
        payload: error
    }
}

export const fetchCurrenciesAction = () => {
    return (dispatch) => {
        dispatch(loadingHandlerAction());
        return new Promise((resolve, reject) => {
            fetchCurrencies()
            .then(response => {
                dispatch(successHandlerAction(response.data));
                resolve();
             })
            .catch((e) => {
                dispatch(errorHandlerAction({message: 'Failed to fetch currencies'}));
                reject(e)
            });
        });
    }
};