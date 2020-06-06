
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { searchRobots } from './reducers';

import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

const store = createStore(searchRobots);

// Provider passes down store, wraps "App" tag
// Store uses reducer to create object tree for state

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
