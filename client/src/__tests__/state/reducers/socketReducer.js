import {socketReducer as reducer, initialState} from '../../../state/reducers/socketReducer';
import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
    UPDATE_VALUE
} from '../../../state/actions/socketActions';


describe('Socket reducers', () => {
    it('should return the initial state of currencies', () => {
        expect(reducer(undefined, {})).toEqual({
            ...initialState
        });
    });

    it('should return state for CONNECT_SOCKET', () => {
        expect(reducer(undefined, {
            type: CONNECT_SOCKET
        })).toEqual({
            ...initialState,
            isConnected: true
        });
    });

    it('should return state for DISCONNECT_SOCKET', () => {

        expect(reducer(undefined, {
            type: DISCONNECT_SOCKET
        })).toEqual({
            ...initialState,
            isConnected: false
        });
    });

    it('should return state for UPDATE_VALUE', () => {
        const mock = {status: 'success', message: '29.232'};
        expect(reducer(undefined, {
            type: UPDATE_VALUE,
            payload: {response: mock}
        })).toEqual({
            ...initialState,
            socketMessage: {...mock}
        });
    });
});