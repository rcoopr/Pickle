import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const paletteSlice = createSlice({
  name: 'palette',
  initialState: { baseColor: '#1fc6ea' },
  reducers: {
    changeBaseColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      // This is wrapped in Immer's produce by RTK
      // eslint-disable-next-line no-param-reassign
      state.baseColor = color;
    },
  },
});

export const { changeBaseColor } = paletteSlice.actions;

export default paletteSlice.reducer;
