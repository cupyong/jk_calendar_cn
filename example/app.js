import React from 'react';
import ReactDOM from 'react-dom';
import Test from './a.js'


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


ReactDOM.render(
    <Test></Test>
    , document.getElementById('app')
);
