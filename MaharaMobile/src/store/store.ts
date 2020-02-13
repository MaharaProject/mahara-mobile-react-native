import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { I18n } from '@lingui/core';
import { rootReducer } from '../reducers/rootReducer';

export default function configureStore(
  preloadedState: any,
  i18n: I18n) {
  const middleware = [thunk];

  middleware.push(createLogger());

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(
       thunk.withExtraArgument({ i18n }),
      ...middleware
    )),
  );
}
