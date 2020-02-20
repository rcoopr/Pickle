import {
  hslArrayToString,
  hslStringToArray,
  formatStringsToCopy,
  swatchesHSL,
} from 'utils/hslConvert';

describe('HSL String <-> Array conversion functions', () => {
  it('converts an array to string', () => {
    const array = hslStringToArray('hsl(0, 50%, 50%)');
    expect(array).toStrictEqual([0, 50, 50]);
  });
  it('converts a string to an array', () => {
    const array = hslArrayToString([50, 100, 30]);
    expect(array).toStrictEqual('hsl(50, 100%, 30%)');
  });
});

describe('Format array of HSL strings into a CSS-usable format', () => {
  it("doesn't change the color value given", () => {
    const hslStrings = ['hsl(20, 30%, 40%)'];
    expect(formatStringsToCopy(hslStrings)).toEqual(["100: 'hsl(20, 30%, 40%)',"]);
  });
});

describe('Swatches -> HSL formatter', () => {
  it('converts an array of HSL arrays into an array of strings', () => {
    const value = swatchesHSL([
      [60, 50, 40],
      [160, 70, 80],
    ]);
    expect(value).toStrictEqual(['hsl(60, 50%, 40%)', 'hsl(160, 70%, 80%)']);
  });
  it('returns rounded values', () => {
    const testValue = swatchesHSL([[0, 10.5, 15.6666]]);
    expect(testValue).toStrictEqual(['hsl(0, 11%, 16%)']);
  });
});
