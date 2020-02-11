// Reducers are wrapped in Immer's produce by RTK
/* eslint-disable no-param-reassign */

import { createSlice, Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import Color from 'color';
// TODO: Remove Color dep
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
      const color = action.payload;
      const hsl = Color(color)
        .hsl()
        .toString();

      state.baseColor = hsl;
    },
    setSaturationDelta(state, action: PayloadAction<number>) {
      const value = action.payload;
      state.saturationDelta = value;
    },
    // eslint-disable-next-line no-underscore-dangle
    _setSwatches(state, action: PayloadAction<{ baseColor: string; saturationDelta: number }>) {
      const { baseColor, saturationDelta } = action.payload;
      const swatches = deriveSwatches(baseColor, saturationDelta);

      state.swatches = swatches;
    },
  },
});

export const { _setSwatches, setBaseColor, setSaturationDelta } = paletteSlice.actions;

export const changeBaseColorIfDiff = (
  color: string,
): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) => {
  const {
    palette: { baseColor, saturationDelta },
  } = getState();

  if (baseColor !== color) {
    dispatch(setBaseColor(color));
    dispatch(_setSwatches({ baseColor, saturationDelta }));
  }
};

export const setSaturationDeltaAndSwatches = (
  val: number,
): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) => {
  const {
    palette: { baseColor },
  } = getState();

  dispatch(setSaturationDelta(val));
  dispatch(_setSwatches({ baseColor, saturationDelta: val }));
};

export default paletteSlice.reducer;
