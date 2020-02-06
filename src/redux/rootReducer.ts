import { combineReducers } from '@reduxjs/toolkit';

import paletteReducer from 'redux/paletteSlice';

const rootReducer = combineReducers({
  palette: paletteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
