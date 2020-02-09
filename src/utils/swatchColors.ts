import Color from 'color';

export const swatchesCSS = (baseColor: Color) => {
  const emptyArray = [...Array(9).fill(null)];
  const swatches = emptyArray.map((_, i) => baseColor.lighten(0.8 - i * 0.2).string());

  return swatches;
};

export const swatchesHSL = (baseColor: Color) => {
  const emptyArray = [...Array(9).fill(null)];
  const swatches = emptyArray.map((_, i) =>
    baseColor
      .lighten(0.8 - i * 0.2)
      .round()
      .hsl()
      .array(),
  );

  return swatches;
};
