import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { onChangeInputValueAction, onConnectAction, onDisconnectAction } from '../../../state/actions/socketActions'
import {
    CONNECT_SOCKET,
    DISCONNECT_SOCKET,
    UPDATE_VALUE
} from '../../../state/actions/socketActions';
import io from 'socket.io-client';

jest.mock('socket.io-client');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockSocketResponse = {
	'BRL': {
		15000: '0.91233',
		25000: '1.92323'
	},
	'USD': {
		15000: '2.822123',
		25000: '3.245677'
	}
};

describe('Socket actions', () => { 
    beforeEach(() => {
        io.connect.mockReturnValue({
            emit: (eventName, opts, cb) => {
                switch(eventName) {
                    case 'fetch_currency': {
                        return cb({
                            status: mockSocketResponse[opts.currency][opts.value] ? 'success' : 'failed',
                            data:  {
                                data: mockSocketResponse[opts.currency][opts.value] || 'Error value should be a number'
                            }
                        });
                    }
    
                    case 'disconnect':
                        return { connect: false }
                    default: 
                        return { connect: true }
                }
            } 
        });
    });

    test('UPDATE_VALUE status success', () => {
        const store = mockStore({
            socket: {
                socketMessage: {},
                isConnected: false
            }
        });

        const expectedActions = [
            { type: CONNECT_SOCKET },
            { type: UPDATE_VALUE, payload: { status: 'success', message: mockSocketResponse['USD'][15000]} },
            { type: DISCONNECT_SOCKET }
        ]
        store.dispatch(onChangeInputValueAction({currency: 'USD', inputValue: 15000}, () => console.log('working')));
        store.dispatch(onDisconnectAction());
        store.subscribe(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test('UPDATE_VALUE  status failed with wrong input value', () => {
        const store = mockStore({
            socket: {
                socketMessage: {},
                isConnected: false
            }
        });

        const expectedActions = [
            { type: CONNECT_SOCKET },
            { type: UPDATE_VALUE, payload: { status: 'failed', message: 'Error value should be a number' }},
            { type: DISCONNECT_SOCKET }
        ];

        store.dispatch(onChangeInputValueAction({currency: 'USD', inputValue: 'ASDWDD'}, () => console.log('working')));
        store.dispatch(onDisconnectAction());
        store.subscribe(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
});