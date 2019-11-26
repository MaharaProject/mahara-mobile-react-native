import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../reducers/reducers';

export default function configureStore(preloadedState) {
  const middleware = [thunk];

  middleware.push(createLogger());

  const composeEnhancers =    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
}
