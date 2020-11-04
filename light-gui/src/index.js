import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import rootReducer from './store/reducers';
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.css'
import 'antd/dist/antd.css';
import './lightStyle.css'
  

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,composeEnhances(
  applyMiddleware(thunk)
))

const app =(
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
    app,
    document.getElementById('root')
  );

