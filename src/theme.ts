const theme = {
  colors: {
    primary: 'hsl(210, 96%, 19%)',
    secondary: 'hsl(210, 38%, 95%)',
    accent: 'hsl(194, 91%, 60%)',
  },
  sizing: {
    small: '0.8rem',
    medium: '1rem',
    large: '2.5rem',
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
