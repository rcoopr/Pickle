import { createSlice, Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import Color from 'color';
import { RootState } from 'redux/rootReducer';

const paletteSlice = createSlice({
  name: 'palette',
  initialState: { baseColor: 'hsl(191, 83%, 52%)' },
  reducers: {
    changeBaseColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      const hsl = Color(color)
        .hsl()
        .toString();
      // This is wrapped in Immer's produce by RTK
      // eslint-disable-next-line no-param-reassign
      state.baseColor = hsl;
    },

    deriveSwatches(state) {
      const saturationCurve = state.settings;
    },
  },
});

export const { changeBaseColor } = paletteSlice.actions;

export const changeBaseColorIfDiff = (
  color: string,
): ThunkAction<void, RootState, null, Action<string>> => (dispatch, getState) => {
  const {
    palette: { baseColor },
  } = getState();

  if (baseColor !== color) {
    dispatch(changeBaseColor(color));
  }
};

export default paletteSlice.reducer;
