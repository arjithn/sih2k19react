import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise-middleware';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import configureStore from './config/store'
import rootSaga from './sagas'
import App from './components/app';
import reducers from './reducers';
import { Routes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom';


const { persistor, store } = configureStore();
store.runSaga(rootSaga)


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Router>
      <Routes />
    </Router>
    </PersistGate>
  </Provider>
  , document.querySelector('.lassi-container'));
