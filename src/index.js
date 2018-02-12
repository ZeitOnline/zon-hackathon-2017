import 'app/styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from 'app/components';
import { audioExplorer } from './reducers';


const store = createStore(audioExplorer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('Root'),
);
