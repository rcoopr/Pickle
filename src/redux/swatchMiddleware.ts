import { Middleware } from '@reduxjs/toolkit';
import { deriveSwatches } from 'utils/swatchColors';
import { setSwatches } from 'redux/paletteSlice';

export const swatchMiddleware: Middleware = ({ getState, dispatch }) => next => action => {
  const result = next(action);

  if (action.type.includes('palette') && action.type !== 'palette/setSwatches') {
    const {
      palette: { baseColor, saturationDelta },
    } = getState();
    const swatches = deriveSwatches(baseColor, saturationDelta);
    dispatch(setSwatches(swatches));
  }

  return result;
};
