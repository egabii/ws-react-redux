import React, {Component} from 'react';


export default class CountDown extends Component{

    state = {
        counter: 0
    };

    constructor(props){
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.counter === 0){
            clearInterval(this.countDown)

           // return true
        } 

        return true;
    }

    componentDidMount() {
        this.onStart();
    };

    onStart = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                counter: this.props.init
            }
        })

        this.countDown = setInterval(() => {
            this.setState(prevState => {
                let counter = prevState.counter - 1;
                return {
                    ...prevState,
                    counter
                }
            })
        }, 1000)
    }

    componentWillUnmount(){ 
        clearInterval(this.countDown);
    }

    render() {
        return (
            <p>{this.state.counter} seconds reminds...</p>
        )
    }
}