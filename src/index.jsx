import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import reducers from './store/reducers';
import rootSaga from './store/sagas';
import './index.css';
import { saveAuthState, loadAuthState } from './store/auth/storage';


const sagaMiddleware = createSagaMiddleware();


const store = (() => createStore(
  reducers,
  { ...loadAuthState() },
  applyMiddleware(sagaMiddleware),
))();


store.subscribe(() => {
  saveAuthState(store.getState());
});


sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
