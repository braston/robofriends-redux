
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { searchRobots, handleRobots } from './reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';

// Define logger
const logger = createLogger();

//Create root reducer, using redux function to combine all reducers
const rootReducer = combineReducers({searchRobots, handleRobots});

// Create store using searchRobots reducer. This populates store with searchRobots props
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

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
