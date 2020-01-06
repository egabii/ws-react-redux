import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
 
import { fetchCurrenciesAction } from '../../state/actions/currenciesActions';
import { onChangeInputValueAction, onConnectAction, onDisconnectAction} from '../../state/actions/socketActions';
import BtcWebSocketApp from './btcWebSocketApp';

// CONFIGURE REACT REDUX
const mapStateToProps = state => {
    return {
        currencies: { ...state.currencies },
        socket: { ...state.socket }
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        fetchCurrencies: fetchCurrenciesAction,
        onEmit: onChangeInputValueAction, 
        onConnect: onConnectAction, 
        onDisconect: onDisconnectAction
    }, dispatch)
};

const hoc = connect(mapStateToProps, mapDispatchToProps)(BtcWebSocketApp);

export { hoc as BtcWebSocketApp };