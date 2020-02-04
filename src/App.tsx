import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import theme from 'theme';
import GlobalStyles from 'globalStyles';

import { Picker } from 'components/picker';

const Container = styled.main`
  display: flex;
`;

const Pane = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
`;

const Colors = styled(Pane)`
  background: #edf2f7;
`;

const Settings = styled(Pane)`
  background: #496480;
  display: flex;
  flex-direction: column;
`;
const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Container data-testid="container">
      <Colors>
        <Picker />
      </Colors>
      <Settings />
    </Container>
  </ThemeProvider>
);

export default App;
