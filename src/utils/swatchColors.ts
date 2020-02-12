import Color from 'color';
import { hslStringToArray } from 'utils/hslConvert';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const linearSpread = (numItems: number) =>
  Array(numItems)
    .fill(0)
    .map((_, i) => (i + 1) / (numItems + 1));

export const halfSine = (amplitude: number, verticalShift: number, period = 2, phaseShift = 0) => (
  x: number,
) => {
  return amplitude * Math.sin(((2 * Math.PI) / period) * (x + phaseShift)) + verticalShift;
};

export const swatchesCSS = (swatches: number[][]) =>
  swatches.map(hslArray => Color.hsl(hslArray).hex());

export const deriveSwatches = (
  baseColor: string,
  params: number, // [-50, 50] - central point has +/-50% saturation than end points
) => {
  const baseColorHSL = hslStringToArray(baseColor);

  const amplitude = params;
  const verticalShift = baseColorHSL[1] - amplitude;
  const partialHalfSine = halfSine(amplitude, verticalShift);

  const lightness = linearSpread(9);
  const saturation = lightness.map(val => clamp(partialHalfSine(val), 0, 100));

  const swatches = lightness.map((lightValue, i) => [
    baseColorHSL[0],
    saturation[i],
    100 * lightValue,
  ]);
  return swatches;
};
