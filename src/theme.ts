const theme = {
  colors: {
    primary: 'hsl(210, 96%, 19%)',
    secondary: 'hsl(210, 38%, 95%)',
    tertiary: 'hsl(212, 31%, 90%)',
    accent: 'hsl(194, 91%, 60%)',
    greys: {
      100: 'hsl(187, 13%, 10%)',
      200: 'hsl(185, 12%, 20%)',
      300: 'hsl(182, 12%, 30%)',
      400: 'hsl(180, 11%, 40%)',
      500: 'hsl(177, 11%, 50%)',
      600: 'hsl(175, 11%, 60%)',
      700: 'hsl(172, 12%, 70%)',
      800: 'hsl(170, 12%, 80%)',
      900: 'hsl(167, 13%, 90%)',
    },
    palette: {
      100: 'hsl(191, 82%, 12%)',
      200: 'hsl(187, 75%, 22%)',
      300: 'hsl(183, 68%, 31%)',
      400: 'hsl(179, 64%, 41%)',
      500: 'hsl(175, 63%, 51%)',
      600: 'hsl(171, 64%, 61%)',
      700: 'hsl(167, 68%, 71%)',
      800: 'hsl(163, 75%, 80%)',
      900: 'hsl(159, 82%, 90%)',
    },
  },
  sizing: {
    small: '0.8rem',
    medium: '1rem',
    large: '2.5rem',
    palette: 150,
    watermark: 53,
    pickerHeight: 150,
    pickerWidth: 300,
  },
  fonts: {
    smallest: '0.625rem',
    small: '0.8rem',
    medium: '1rem',
    larger: '1.3rem',
    largest: '1.8rem',
  },
};

export type ITheme = typeof theme;
export default theme;
