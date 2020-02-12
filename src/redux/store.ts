import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer, { RootState } from 'redux/rootReducer';
import { swatchMiddleware } from 'redux/swatchMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware<RootState>(), swatchMiddleware],
});

export type Dispatch = typeof store.dispatch;
export default store;
