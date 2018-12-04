import React from 'react';
import ReactDOM from 'react-dom';
import Picker from '../src/picker'
import createReactClass from 'create-react-class';

function submit(value) {
    console.log("submit", value)
}

function onChange(value) {
    console.log('onChange', value);
}
let defaultValue = []

function testq1() {
    setTimeout(() => {
        defaultValue=[]
    }, 100);
}


const Test = createReactClass({
    getInitialState() {
        return {
            a: 1,
            value: []

        };
    },
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                a: 2,
                value: ["2018-01-01", "2018-01-02"]
            })
        }, 2000);
    },

    render() {
      console.log(this.state.value)
        return <Picker
            defaultValue={this.state.value}
            submit={submit}
        >
        </Picker>
    }
})
export default Test;
