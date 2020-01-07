import axios from 'axios';

export const fetchCurrencies = () => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:4000/api/btc/currencies`)
        .then(response => {
            resolve(response.data);
        })
        .catch(err => {
            reject(err);
        })
    });
};