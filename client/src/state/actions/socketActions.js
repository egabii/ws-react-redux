
import {onConnect, onDisconnect, onChangeCurrencyValue } from '../../providers/socketService';

export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const DISCONNECT_SOCKET = 'DISCONNECT_SOCKET';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const ON_CLEAR_DELAY = 'ON_CLEAR_DELAY';
export const ON_DELAY = 'ON_DELAY';


const connectSocket = () => ({
    type: CONNECT_SOCKET
});

const disconnectSocket = () => ({
    type: DISCONNECT_SOCKET
});

const onEmit = (response) => ({
    type: UPDATE_VALUE,
    payload: { response }
});

export const onChangeInputValueAction = ({inputValue, currency}, callback) => {
    return (dispatch, getState) => {
        if (!getState().isConnected) {
            dispatch(onConnectAction());
        }

        onChangeCurrencyValue({inputValue, currency}, (response) => {
            dispatch(onEmit(response));
            callback();
        });
  
    }
};

export const onConnectAction = () => {
    return (dispatch) => {
        onConnect();
        dispatch(connectSocket());
    }
}

export const onDisconnectAction = () => {
    return (dispatch) => {
        dispatch(disconnectSocket());
        onDisconnect()
    } 
}