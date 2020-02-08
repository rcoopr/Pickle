import Color from 'color';
import { HSLColor, RGBColor } from 'react-color';
// Called with base color
// Each method returns 9 Swatch items in array

// METHODS:
// CSS color string
// HSL Object

type IColor = string | HSLColor | RGBColor;

export const hslLabel = (color: string) => {
  const hsl = Color(color)
    .hsl()
    .round();
  const label = [`H: ${hsl.hue()}`, `S: ${hsl.saturationl()}%`, `L: ${hsl.lightness()}%`];

  return label;
};

export const swatchesCSS = (baseColor: IColor) => {
  const emptyArray = [...Array(9).fill(null)];
  const color = Color(baseColor);
  const swatches = emptyArray.map((_, i) => color.lighten(0.8 - i * 0.2).string());

  return swatches;
};

export const swatchesHSL = (baseColor: string) => {
  const emptyArray = [...Array(9).fill(null)];
  const color = Color(baseColor);
  const swatches = emptyArray.map((_, i) =>
    color
      .lighten(0.8 - i * 0.2)
      .round()
      .hsl()
      .array(),
  );

  return swatches;
};
