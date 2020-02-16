import Color from 'color';

/**
 * For conversion between human-readable string format to arrays of color channels
 * @param {string} hslString of format 'hsl(H, S%, L%)',
 * h represents hue from 0-359,
 * s represents hue from 0-100,
 * l represents hue from 0-100,
 *
 * @return {number[]} [H, S, L]
 */
export const hslStringToArray = (hslString: string) =>
  hslString.match(/[0-9]+/g)!.map(val => parseInt(val, 10));

/**
 * For conversion between array of color channels to human-readable string format
 * @param  {number[]} hslArray of format [H, S, L],
 * h represents hue from 0-359,
 * s represents hue from 0-100,
 * l represents hue from 0-100,
 *
 * @return {string} 'hsl(H, S, L)'
 */
export const hslArrayToString = (hslArray: number[]) =>
  `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;

/**
 * Used to export the palette in a 'CSS-usable' format
 * @param  {string[]} strings of format 'hsl(H, S%, L%)'
 */
export const formatStringsToCopy = (strings: string[]) =>
  strings.map((string, i) => `${(i + 1) * 100}: '${string}',`);

/**
 * Used to export the palette in HSL format, each channel rounded to nearest int
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [H, S, L]
 */
export const swatchesHSL = (swatches: number[][]) =>
  swatches.map(swatch => hslArrayToString(swatch.map(channel => parseFloat(channel.toFixed(0)))));

/**
 * Converts from HSL into Hex format
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [H, S, L]
 */
export const swatchesHex = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .hex()
      .toString(),
  );

/**
 * Used to export the palette in RGB format, each channel rounded to nearest int
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [H, S, L]
 */
export const swatchesRGB = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .rgb()
      .toString(),
  );
