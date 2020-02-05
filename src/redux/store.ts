import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'redux/rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type Dispatch = typeof store.dispatch;
export default store;
