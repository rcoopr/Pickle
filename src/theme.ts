const theme = {
  colors: {
    primary: 'hsl(210, 96%, 19%)',
    secondary: 'hsl(210, 54%, 95%)',
    accent: 'hsl(194, 91%, 60%)',
  },
  sizing: {
    small: '0.8rem',
    medium: '1rem',
    large: '2.5rem',
  },
};

export type ITheme = typeof theme;
export default theme;
