import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from 'color';

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
  },
});

export const { changeBaseColor } = paletteSlice.actions;

export default paletteSlice.reducer;
