/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/no-test-prefixes */
import palette, { setBaseColor } from 'redux/paletteSlice';

describe('palette reducer', () => {
  xit('should handle initial state', () => {
    expect(palette(undefined, {})).toEqual({ baseColor: '#1fc6ea' });
  });

  xit('should handle changing base color', () => {
    expect(
      palette(
        { baseColor: '#1fc6ea' },
        {
          type: setBaseColor.type,
          payload: '#f7cf7d',
        },
      ),
    ).toEqual({ baseColor: '#f7cf7d' });
  });

  xit('should not accept numbers as base color', () => {
    expect(palette({}, { type: setBaseColor.type, payload: 1 })).toThrowError();
  });
});
