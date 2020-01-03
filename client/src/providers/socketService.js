import io from 'socket.io-client';

let socket = null;

export const onConnect = () => {
    socket = io.connect('http://localhost:4000');
};

export const onDisconnect = () => {
    socket.emit('disconnect'); // On servcer side there is a event which disconnects 
    socket = null;
};

export const onChangeCurrencyValue = ({currency, inputValue}, callback) => {
    socket.emit('fetch_currency', {
        currency: currency,
        value: inputValue
    }, (response) => {
        callback({
            status: response.status,
            message: response.status === 'failed' ? 'Not websocket available' : response.data.data
        })
    });
}