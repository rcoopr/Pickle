import paletteReducer from 'redux/paletteSlice';

export type RootState = ReturnType<typeof paletteReducer>;
export default paletteReducer;
