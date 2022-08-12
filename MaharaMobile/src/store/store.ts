import { configureStore as reduxConfigureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { rootReducer } from './reducers/rootReducer';

export default function configureStore() {
  return reduxConfigureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
  });
}
