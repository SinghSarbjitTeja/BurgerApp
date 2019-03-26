import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

// this is just to enable Browser routing in application- this is forst step for using routing in app
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>);


ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
