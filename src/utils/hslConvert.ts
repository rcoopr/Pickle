import Color from 'color';

export const hslStringToArray = (hslString: string) =>
  hslString
    .match(/[0-9]+/g)! // Catch each color channel
    .map(val => parseInt(val, 10)); // Return an int

export const hslArrayToString = (hslArray: number[]) =>
  `hsl(${hslArray[0]}, ${hslArray[1]}%, ${hslArray[2]}%)`;

export const formatStringsToCopy = (strings: string[]) =>
  strings.map((string, i) => `${(i + 1) * 100}: ${string};`);

export const swatchesHex = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .hex()
      .toString(),
  );

export const swatchesHSL = (swatches: number[][]) =>
  swatches.map(swatch => hslArrayToString(swatch.map(channel => parseFloat(channel.toFixed(1)))));

export const swatchesRGB = (swatches: number[][]) =>
  swatches.map(swatch =>
    Color.hsl(swatch)
      .rgb()
      .toString(),
  );
