// Reducers are wrapped in Immer's produce by RTK
/* eslint-disable no-param-reassign */

import { createSlice, Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { deriveSwatches } from 'utils/swatchColors';
import { RootState } from 'redux/rootReducer';

const paletteSlice = createSlice({
  name: 'palette',
  initialState: {
    baseColor: 'hsl(191, 83%, 57%)',
    saturationDelta: -20,
    hueDelta: -40,
    swatches: deriveSwatches('hsl(191, 83%, 57%)', -20, -40),
  },
  reducers: {
    setBaseColor(state, action: PayloadAction<string>) {
      state.baseColor = action.payload;
    },
    setSaturationDelta(state, action: PayloadAction<number>) {
      state.saturationDelta = action.payload;
    },
    setHueDelta(state, action: PayloadAction<number>) {
      state.hueDelta = action.payload;
    },
    setSwatches(state, action: PayloadAction<number[][]>) {
      state.swatches = action.payload;
    },
  },
});

export const { setSwatches, setBaseColor, setSaturationDelta, setHueDelta } = paletteSlice.actions;

export const updateStateIfDiff = (
  color?: string,
  sDelta?: number,
  hDelta?: number,
): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) => {
  const {
    palette: { baseColor, saturationDelta, hueDelta },
  } = getState();

  if (color && color !== baseColor) {
    dispatch(setBaseColor(color));
  }

  if (sDelta && sDelta !== saturationDelta) {
    dispatch(setSaturationDelta(sDelta));
  }

  if (hDelta && hDelta !== hueDelta) {
    dispatch(setHueDelta(hDelta));
  }
};

export default paletteSlice.reducer;
