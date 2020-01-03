
module.exports = {
    mapCurrencyOptions(fetchedCurrencies){
        const mappedCurrency = [];
        for (var [key, value] of Object.entries(fetchedCurrencies)) {
            mappedCurrency.push({
                currency: key,
                symbol: value.symbol
            });
        }

        return mappedCurrency;
    }
}