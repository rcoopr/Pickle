import { Action, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import reducer, {
  initialState,
  setBaseColor,
  setSaturationDelta,
  setHueDelta,
  setSwatches,
  updateStateIfDiff,
  selectBaseColor,
  selectSaturationDelta,
  selectHueDelta,
  selectSwatches,
} from 'redux/paletteSlice';

describe('palette slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      const nextState = initialState;
      const result = reducer(undefined, { type: undefined });
      expect(result).toBe(nextState);
    });

    it('should update baseColor on dispatch', () => {
      const data = 'hsl(1, 63%, 62%)';
      const nextState = reducer(initialState, setBaseColor(data));
      expect(selectBaseColor(nextState)).toBe('hsl(1, 63%, 62%)');
    });

    it('should update swatches when baseColor changes', () => {
      const data = 'hsl(1, 63%, 62%)';
      const nextState = reducer(initialState, updateStateIfDiff(data));
      const nextSwatches = selectSwatches(nextState);
      expect(nextSwatches[4]).toBe('hsl(1, 63%, 62%)');
    });
  });
});
