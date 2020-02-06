import palette, { changeBaseColor } from 'redux/paletteSlice';

describe('palette reducer', () => {
  it('should handle initial state', () => {
    expect(palette(undefined, {})).toEqual({ baseColor: '#1fc6ea' });
  });

  it('should handle changing base color', () => {
    expect(
      palette(
        { baseColor: '#1fc6ea' },
        {
          type: changeBaseColor.type,
          payload: '#f7cf7d',
        },
      ),
    ).toEqual({ baseColor: '#f7cf7d' });
  });

  it('should not accept numbers as base color', () => {
    expect(palette({}, { type: changeBaseColor.type, payload: 1 })).toThrowError();
  });
});
