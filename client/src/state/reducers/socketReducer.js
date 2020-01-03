import produce from 'immer';

import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
    UPDATE_VALUE
} from '../actions/socketActions';

const initialState = {
    socketMessage: {},
    isConnected: false
};

export const socketReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type){
            case CONNECT_SOCKET: 
                draft.isConnected = true; break;
            case DISCONNECT_SOCKET:
                draft.isConnected = false; break;
            case UPDATE_VALUE: 
                draft.socketMessage = action.payload.response; break;
            default:
                return draft
        }
    })
}