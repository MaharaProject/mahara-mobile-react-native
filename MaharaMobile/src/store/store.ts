import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';

export default function configureStore(preloadedState) {
  const middleware = [thunk];

  middleware.push(createLogger());

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middleware)));
}
