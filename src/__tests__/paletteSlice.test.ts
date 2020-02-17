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
import { swatchMiddleware } from 'redux/swatchMiddleware';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureMockStore from 'redux-mock-store';

describe('palette slice', () => {
  describe('reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
      const nextState = initialState;
      const result = reducer(undefined, { type: undefined });
      expect(result).toBe(nextState);
    });

    it('should update baseColor on dispatch', () => {
      const data = 'hsl(0, 60%, 60%)';
      const nextState = reducer(initialState, setBaseColor(data));
      expect(selectBaseColor(nextState)).toBe(data);
    });

    it('should update saturationDelta on dispatch', () => {
      const data = -20;
      const nextState = reducer(initialState, setSaturationDelta(data));
      expect(selectSaturationDelta(nextState)).toBe(data);
    });

    it('should update hueDelta on dispatch', () => {
      const data = 20;
      const nextState = reducer(initialState, setHueDelta(data));
      expect(selectHueDelta(nextState)).toBe(data);
    });

    it('should update swatches on dispatch', () => {
      const data = Array(9).fill([0, 10, 20]);
      const nextState = reducer(initialState, setSwatches(data));
      expect(selectSwatches(nextState)).toBe(data);
    });

    it('should not affect hue/sat delta when using setBaseColor', () => {
      const data = 'hsl(0, 60%, 60%)';
      const nextState = reducer(initialState, setBaseColor(data));
      expect(selectSaturationDelta(nextState)).toBe(initialState.saturationDelta);
      expect(selectHueDelta(nextState)).toBe(initialState.hueDelta);
    });

    it('should not affect hue delta when using setSaturationDelta', () => {
      const data = 30;
      const nextState = reducer(initialState, setSaturationDelta(data));
      expect(selectHueDelta(nextState)).toBe(initialState.hueDelta);
    });

    it('should not affect sat delta when using setHueDelta', () => {
      const data = 30;
      const nextState = reducer(initialState, setHueDelta(data));
      expect(selectSaturationDelta(nextState)).toBe(initialState.saturationDelta);
    });

    it.skip('should update swatches when baseColor changes', () => {
      const data = 'hsl(1, 63%, 62%)';
      const nextState = reducer(initialState, updateStateIfDiff(data));
      const nextSwatches = selectSwatches(nextState);
      expect(nextSwatches[4]).toBe('hsl(1, 63%, 62%)');
    });
  });
});

describe('custom swatch middleware', () => {
  const middlewares = [...getDefaultMiddleware(), swatchMiddleware];
  const mockStore = configureMockStore(middlewares);

  it('should pass intercepted actions to next', () => {
    const nextArgs: any[] = [];
    const mockNext = (...args: any): any => nextArgs.push(args);
    const action = { type: 'TEST' };

    swatchMiddleware(mockStore())(mockNext)(action);

    expect(nextArgs[0]).toStrictEqual([action]);
    expect(nextArgs.length).toBe(1);
  });

  it.skip("should catch actions of where type contains 'palette'", () => {
    const nextArgs: any[] = [];
    const mockNext = (...args: any): any => nextArgs.push(args);

    const action = { type: 'palette/TEST' };

    swatchMiddleware(mockStore({ initialState }))(mockNext)(action);
    expect(nextArgs[0]).toStrictEqual([action]);
    expect(nextArgs.length).toBe(1);
  });
});
