import { hslStringToArray } from 'utils/hslConvert';

// Returns value no smaller than min, no larger than max
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Return numItems as #values spread evenly from min to max
const linearSpread = (numItems: number, min = 0, max = 1) =>
  Array(numItems)
    .fill(0)
    .map((_, i) => {
      // Spread values evenly from 0 to 1
      const valBetween0and1 = (i + 1) / (numItems + 1);
      // Scale by the output range and increase all values by minimum output value
      return valBetween0and1 * (max - min) + min;
    });

// Internal function - Maps linear input values (lightness) to variable output (saturation and hue)
// Curried to reduce extrraneous function creations. Each time the user-selected color changes,
// the partial function is called once for each tone
export const halfSine = (amplitude: number, verticalShift: number, period = 2, phaseShift = 0) => (
  x: number,
) => {
  // General form of sine wave is dependent on these 4 variables;
  // Amplitude: maximum height offset from origin,
  // Period: length of repeating segment,
  // Phase shift: negative horizontal offset from origin,
  // Vertical shift: vertical offset from origin
  return amplitude * Math.sin(((2 * Math.PI) / period) * (x + phaseShift)) + verticalShift;
};

/**
 * @param  {string} baseColor user-selected color
 * @param  {number} saturationDelta difference in saturation from the most-saturated tone to the least
 * @param  {number} hueDelta difference in hue from the first tone to the last
 */
export const deriveSwatches = (baseColor: string, saturationDelta: number, hueDelta: number) => {
  const baseColorHSL = hslStringToArray(baseColor);

  // Lightness as a value from [0, 1]; Forms a base unit value to scale saturation from
  const baseLightnessFraction = baseColorHSL[2] / 100;
  // The smaller of the 2 distances from [0, baselightnessFraction] and [baselightnessFraction, 1]
  const lightnessSpace = Math.min(baseLightnessFraction, 1 - baseLightnessFraction);
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
  const saturation = lightness.map(val => clamp(partialHalfSine(val), 0, 100));

  const swatches = lightness.map((lightValue, i) => [hue[i], saturation[i], 100 * lightValue]);
  return swatches;
};
