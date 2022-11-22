import { Middleware, configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/rootReducer';

const devMiddleware: Middleware[] = [];
if (__DEV__) {
  import('redux-logger').then(({ createLogger }) => devMiddleware.push(createLogger()));
}

export default function configureStore() {
  return reduxConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(devMiddleware)
  });
}
