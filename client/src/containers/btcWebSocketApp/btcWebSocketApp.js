import React, {Component} from 'react';
import { Form, Field } from '../../components/form';
import { Content } from '../../components/content';


export default class BtcWebSocketApp extends Component {
    state = {
        delayTime: 5,
        inputValue: 15000,
        selectedCurrency: null
    }

    interval = null;

    constructor(props){
        super(props);
    }

    async componentDidMount() {
        this.props.onConnect();
        try {
            console.log('hola mundo 1');
            console.log(this.props);
            await this.props.fetchCurrencies();
            if (this.props.currencies.fetched) {
                console.log('hola mundo 2');

                this.setState(prevState => {
                    return {
                        ...prevState,
                        selectedCurrency: this.props.currencies.data[0]
                    }
                }, () => {
                    console.log('hola mundo 3');

                    this.onEmit();
                    this.interval = setInterval(() => this.onEmit(), this.state.delayTime * 1000)
                });

            }
            console.log('hola mundo 4');

        } catch(e) {
            console.log(e);
        }
    }

    displayCurrencyValue = () => {
        let currenyValue = 0;
        currenyValue = Math.round(this.props.socket.socketMessage.message * 100) / 100
        return <h1>{`${this.state.selectedCurrency.symbol} ${currenyValue}`}</h1>
    }

    onEmit = () => {
        this.props.onEmit({
            currency: this.state.selectedCurrency.currency,
            inputValue: this.state.inputValue
        }, () => {
            if (this.props.socket.socketMessage.status === 'failed') {
                clearInterval(this.interval);
            }
        })
    }

    componentWillUnmount() {
        console.log('unmount')
        this.props.onDisconect();
        clearInterval(this.interval);
    }

    onChangeInput = ({target: {name, value}}) => {
        this.setState(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        }, () => {
            clearInterval(this.interval);
            this.onEmit();
            this.interval = setInterval(() => this.onEmit(), this.state.delayTime * 1000)
        });
    }

    onSelect = ({target: {name, value}}) => {
        this.setState(prevState => {
            return {
                ...prevState,
                [name]: JSON.parse(value)
            }
        }, () => {

            clearInterval(this.interval);
            this.onEmit(); // apply changes then initialize setinterval again
            this.interval = setInterval(() => this.onEmit(), this.state.delayTime * 1000);
        });
    }

    render(){
        return (
            <>
            { this.props.currencies.fetching && <h1>...LOADING</h1> }
            { this.props.currencies.failed && <h1>SOMETHING WENT WRONG</h1> }
            {
                this.props.currencies.fetched
                && (
                    <>
                    <Form>
                        <Field 
                            order={1}
                            key={'delayTime'}
                            name={'delayTime'} 
                            type={'number'}
                            onChangeInput={this.onChangeInput}
                            defaultValue={this.state.delayTime}
                        />
        
                        <Field 
                            order={2}
                            key={'inputValue'}
                            name={'inputValue'}
                            type={'text'}
                            onChangeInput={this.onChangeInput}
                            defaultValue={this.state.inputValue}
                        />
                        <Field
                            order={3}
                            key={'selectedCurrency'}
                            name={'selectedCurrency'} 
                            type={'select'}
                            onChangeInput={this.onSelect}
                            defaultValue={this.state.selectedCurrency}
                            options={
                                this.props.currencies.data.map(currency => ({
                                    key: currency.currency,
                                    value: currency,
                                    displayName: currency.currency,
                                }))
                            }
                        /> 
                    </Form>
                    <Content>
                        {this.props.socket.socketMessage.status === 'failed' && <h1>{ this.props.socket.socketMessage.message }</h1>}
                        {
                            (this.state.selectedCurrency 
                                && this.props.socket.socketMessage.status === 'success') 
                            && this.displayCurrencyValue()
                        }
                    </Content>
                </>
                )
            }

            </>

        )
    }
}