import { hslStringToArray } from 'utils/hslConvert';

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const linearSpread = (numItems: number, min = 0, max = 1) =>
  Array(numItems)
    .fill(0)
    .map((_, i) => {
      const valBetween0and1 = (i + 1) / (numItems + 1);
      return valBetween0and1 * (max - min) + min;
    });

export const halfSine = (amplitude: number, verticalShift: number, period = 2, phaseShift = 0) => (
  x: number,
) => {
  return amplitude * Math.sin(((2 * Math.PI) / period) * (x + phaseShift)) + verticalShift;
};

export const deriveSwatches = (baseColor: string, saturationDelta: number, hueDelta: number) => {
  const baseColorHSL = hslStringToArray(baseColor);

  const baseLightnessFraction = baseColorHSL[2] / 100;
  const lightnessSpace = Math.min(1 - baseLightnessFraction, baseLightnessFraction);
  const lightness = linearSpread(
    9,
    baseLightnessFraction - lightnessSpace,
    baseLightnessFraction + lightnessSpace,
  );
  const hue = linearSpread(9, baseColorHSL[0] - hueDelta / 2, baseColorHSL[0] + hueDelta / 2);

  const amplitude = saturationDelta;
  const verticalShift = baseColorHSL[1] - amplitude;
  const period = lightnessSpace * 2 * 2;
  const phaseShift = -(baseLightnessFraction - lightnessSpace);
  const partialHalfSine = halfSine(amplitude, verticalShift, period, phaseShift);

  const saturation = lightness.map(val => clamp(partialHalfSine(val), 0, 100));

  const swatches = lightness.map((lightValue, i) => [hue[i], saturation[i], 100 * lightValue]);
  return swatches;
};
