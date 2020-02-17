import { hslStringToArray } from 'utils/hslConvert';

/**
 * Returns value no smaller than min, no larger than max
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const clamp = (value: number, min: number, max: number): number => {
  const clamped = Math.min(Math.max(value, min), max);
  return Math.round(clamped * 100) / 100;
};

/**
 * Return values spread evenly from min to max
 *
 * @param {number} numItems
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
export const linearSpread = (numItems: number, min: number, max: number): number[] =>
  Array(numItems)
    .fill(0)
    .map((_, i) => {
      const step = (max - min) / (numItems - 1);
      const result = min + i * step;

      return result;
    });

/**
 * Maps input values (from linearSpread) to values from half of a sine function. Used for tuning
 *    saturation of swatches. Curried to reduce extrraneous function creations. Each time the
 *    user-selected color changes, the partial function is called once for each tone.
 *
 * @param {number} amplitude maximum height offset from origin
 * @param {number} verticalShift length of repeating segment
 * @param {number} [period=2] negative horizontal offset from origin
 * @param {number} [phaseShift=0] vertical offset from origin
 */
export const halfSine = (
  amplitude: number,
  verticalShift: number,
  period: number = 2,
  phaseShift: number = 0,
) => (x: number) => {
  return amplitude * Math.sin(((2 * Math.PI) / period) * (x + phaseShift)) + verticalShift;
};

/**
 * Takes the user-selected base color and returns color channel data for tones from dark to light.
 *    Tunes saturation at high- and low-ends of lightness to avoid washout.
 *    Tunes hue to rotate about the central point to adjust for perceived brightness.
 *
 * @param  {string} baseColor user-selected color
 * @param  {number} saturationDelta difference in saturation from the most-saturated tone to the least
 * @param  {number} hueDelta difference in hue from the first tone to the last
 */
export const deriveSwatches = (baseColor: string, saturationDelta: number, hueDelta: number) => {
  const baseColorHSL = hslStringToArray(baseColor);

  // Lightness as a value from [0, 1]; Forms a base unit value to scale saturation from
  const baseLightnessFraction = baseColorHSL[2] / 100;
  // The smaller of the 2 distances from [minLightness, baselightnessFraction] and [baselightnessFraction, maxLightness]
  const [minLightness, maxLightness] = [0.1, 0.95];
  const lightnessSpace = Math.min(
    baseLightnessFraction - minLightness,
    maxLightness - baseLightnessFraction,
  );
  // Spread values across the space. This prevents values exceeding the edges of the graph
  const lightness = linearSpread(
    9,
    baseLightnessFraction - lightnessSpace,
    baseLightnessFraction + lightnessSpace,
  );
  // Spread hue according to the hue delta chosen by the user
  const hue = linearSpread(9, baseColorHSL[0] - hueDelta / 2, baseColorHSL[0] + hueDelta / 2);

  // Height of curve is equal to the saturation delta chosen by the user
  const amplitude = saturationDelta;
  // Shifts the curve up the graph as saturation increases. Subtract the amplitude so as saturation
  // delta changes, the ends of the curve changes, not the middle
  const verticalShift = baseColorHSL[1] - amplitude;
  // 0 values can cause NaN values to be sent to the svg circle elements
  // The 'width' of the curve is kept from exceeding the edges of the graph
  const period = Math.max(lightnessSpace * 2 * 2, 0.001);
  // As the user picks lighter colors, the curve shifts appropriately
  const phaseShift = -(baseLightnessFraction - lightnessSpace);
  // Without partial the same function is recreated numTimes (9 by default)
  const partialHalfSine = halfSine(amplitude, verticalShift, period, phaseShift);

  // return [vals] between [0, 100] for generated saturation
  const saturation = lightness.map(val =>
    clamp(partialHalfSine(val), minLightness * 100, maxLightness * 100),
  );

  const swatches = lightness.map((lightValue, i) => [
    hue[i],
    saturation[i],
    clamp(100 * lightValue, minLightness * 100, maxLightness * 100),
  ]);
  return swatches;
};
