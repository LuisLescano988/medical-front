import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducer';
import tokenMiddleware from './AuthMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tokenMiddleware),
});

export default store;