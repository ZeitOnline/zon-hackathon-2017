import 'app/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from 'app/components';
import rootReducer from './reducers';

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('Root'),
);
