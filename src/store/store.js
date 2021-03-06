import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { saveAuthState, loadAuthState } from './auth/storage';
import reducers from './reducers';
import rootSaga from './sagas';


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


export default store;
