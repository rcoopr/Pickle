import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: ${props => props.theme.sizing.medium};
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
  }
  
  img {
    height: auto;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
`;
