import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducers';

/**
 * Inject middle-ware to enhance redux store.
 */
function enhancer() {
  const middlewares = [ReduxThunk, ReduxPromise];
  return compose(applyMiddleware(...middlewares));
}

export const generateStore = () => {
  const store = createStore(reducers, enhancer());
  return store;
};
