import { createSlice, Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { deriveSwatches } from 'utils/swatchColors';

export const initialState = {
  baseColor: 'hsl(191, 83%, 57%)',
  saturationDelta: -10,
  hueDelta: -20,
  swatches: deriveSwatches('hsl(191, 83%, 57%)', -10, -20),
};

const paletteSlice = createSlice({
  name: 'palette',
  initialState,
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
  const { baseColor, saturationDelta, hueDelta } = getState();

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

export const selectBaseColor = (state: RootState) => state.baseColor;
export const selectSaturationDelta = (state: RootState) => state.saturationDelta;
export const selectHueDelta = (state: RootState) => state.hueDelta;
export const selectSwatches = (state: RootState) => state.swatches;

export type RootState = ReturnType<typeof paletteSlice.reducer>;

export default paletteSlice.reducer;
