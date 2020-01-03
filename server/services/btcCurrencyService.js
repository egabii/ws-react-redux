const axios = require('axios').default;
const helper = require('../helpers/currencyHelper');

module.exports = {
    getRateOfCurrency(currency, value) {
        return new Promise((resolve, reject) => {
            axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`)
            .then(response => {
                resolve({data: response.data});
            })
            .catch(err => {
                reject(err);
            })
        });
    },

    getCurrencies(){
        return new Promise((resolve, reject) => {
            axios.get(`https://blockchain.info/ticker`)
            .then(({data}) => {
                resolve({data: helper.mapCurrencyOptions(data)});
            })
            .catch(err => {
                reject(err);
            })
        })
    }
};