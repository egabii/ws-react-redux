export const fetchCurrencies = () => {
    return new Promise((resolve, reject) => {
        return fetch('http://localhost:4000/api/btc/currencies', {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
        .then(response => {
            if (response.ok) {
                response.json()
                .then((json) => {
                    response.status === 200 ? resolve({data: json.data}) : reject(json);;
                })
            } else {
                reject({ statusCode: -1, error: 'something is wrong with internet connection'})
            }
        });
    });
}