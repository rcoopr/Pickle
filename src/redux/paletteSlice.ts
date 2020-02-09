import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Color from 'color';

const paletteSlice = createSlice({
  name: 'palette',
  initialState: { baseColor: Color('hsl(191, 83%, 52%)') },
  reducers: {
    changeBaseColor(state, action: PayloadAction<Color>) {
      const color = action.payload;
      // This is wrapped in Immer's produce by RTK
      // eslint-disable-next-line no-param-reassign
      state.baseColor = Color(color);
    },
  },
});

export const { changeBaseColor } = paletteSlice.actions;

export default paletteSlice.reducer;
