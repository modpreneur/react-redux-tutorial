'use strict';

import './less/main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx';

console.log('hello world');

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
);