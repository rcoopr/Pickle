import Color from 'color';

/**
 * For conversion between human-readable string format to arrays of color channels
 * @param {string} hslString of format 'hsl(h, s%, l%)',
 * h represents hue from 0-359,
 * s represents hue from 0-100,
 * l represents hue from 0-100,
 *
 * @return {number[]} [h, s, l]
 */
export const hslStringToArray = (hslString: string) =>
  hslString
    .match(/[0-9]+/g)! // Catch each color channel
    .map(val => parseInt(val, 10)); // Return an int

/**
 * For conversion between array of color channels to human-readable string format
 * @param  {number[]} hslArray of format [h, s, l],
 * h represents hue from 0-359,
 * s represents hue from 0-100,
 * l represents hue from 0-100,
 *
 * @return {string} 'hsl(h, s, l)'
 */
export const hslArrayToString = (hslArray: number[]) =>
  `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;

/**
 * Used to export the palette in a 'CSS-usable' format
 * @param  {string[]} strings of format 'hsl(h, s%, l%)'
 */
export const formatStringsToCopy = (strings: string[]) =>
  strings.map((string, i) => `'${(i + 1) * 100}': '${string}',`);

/**
 * Converts from HSL into Hex format
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [h, s, l]
 */
export const swatchesHex = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .hex()
      .toString(),
  );

/**
 * Used to export the palette in HSL format, each channel rounded to nearest int
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [h, s, l]
 */
export const swatchesHSL = (swatches: number[][]) =>
  swatches.map(swatch => hslArrayToString(swatch.map(channel => parseFloat(channel.toFixed(0)))));

/**
 * Used to export the palette in RGB format, each channel rounded to nearest int
 * @param  {number[][]} swatches derived data from user-selected color
 * swatches array contains hslArrays - [h, s, l]
 */
export const swatchesRGB = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .rgb()
      .toString(),
  );
