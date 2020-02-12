// Reducers are wrapped in Immer's produce by RTK
/* eslint-disable no-param-reassign */

import { createSlice, Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { deriveSwatches } from 'utils/swatchColors';
import { RootState } from 'redux/rootReducer';

const paletteSlice = createSlice({
  name: 'palette',
  initialState: {
    baseColor: 'hsl(191, 83%, 52%)',
    saturationDelta: -20,
    swatches: deriveSwatches('hsl(191, 83%, 52%)', -20),
  },
  reducers: {
    setBaseColor(state, action: PayloadAction<string>) {
      state.baseColor = action.payload;
    },
    setSaturationDelta(state, action: PayloadAction<number>) {
      state.saturationDelta = action.payload;
    },
    setSwatches(state, action: PayloadAction<number[][]>) {
      state.swatches = action.payload;
    },
  },
});

export const { setSwatches, setBaseColor, setSaturationDelta } = paletteSlice.actions;

export const updateStateIfDiff = (
  color?: string,
  delta?: number,
): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) => {
  const {
    palette: { baseColor, saturationDelta },
  } = getState();

  if (color && color !== baseColor) {
    dispatch(setBaseColor(color));
  }

  if (delta && delta !== saturationDelta) {
    dispatch(setSaturationDelta(delta));
  }
};

export default paletteSlice.reducer;
