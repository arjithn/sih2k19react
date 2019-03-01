import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createSagaMiddleware, { END } from 'redux-saga'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import reducer from '../reducers'


const persistConfig = {
  key: 'root',
  whitelist: ['purchase', 'cart', 'user', 'device', 'appInstallStatus'],
  storage,
  stateReconciler: autoMergeLevel2,
  debounce: 500,
}
const persistedReducer = persistReducer(persistConfig, reducer)
export const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const middlewares = [sagaMiddleware]
  middlewares.push(createLogger())

  const store = createStore(persistedReducer, applyMiddleware(...middlewares))
  const persistor = persistStore(store)
  // persistor.purge()
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return { store, persistor }
}
export default configureStore
