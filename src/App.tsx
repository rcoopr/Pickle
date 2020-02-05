import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import GlobalStyles from 'globalStyles';

import Octicon, { MarkGithub } from '@githubprimer/octicons-react';

import { Header } from 'components/header';
import { Picker } from 'components/picker';
// import { Controls } from 'components/controls';

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
  background: #486480;
  display: flex;
  flex-direction: column;
`;

const PickerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${p => p.theme.sizing.large};
  padding: ${p => p.theme.sizing.large};
  border-radius: 12px;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

const Watermark = styled.div`
  position: absolute;
  left: ${p => p.theme.sizing.medium};
  bottom: ${p => p.theme.sizing.medium};
  opacity: 0.4;
  font-size: ${p => p.theme.fonts.small};
  color: #000;

  & > a {
    color: inherit;
    text-decoration: none;
  }
`;

const GithubLink = styled(Octicon)`
  margin-right: 0.4em;
  font-size: 2em;
  width: ${p => p.theme.fonts.larger};
  height: ${p => p.theme.fonts.larger};
`;

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Container data-testid="container">
      <Colors>
        <Header />
        <PickerCard>
          <Picker />
          {/* <Controls /> */}
        </PickerCard>
        <Watermark>
          <a href="https://github.com/Froskk">
            <GithubLink icon={MarkGithub} verticalAlign="middle" ariaLabel="Github link" />
            <span>MADE BY ROSS COOPER</span>
          </a>
        </Watermark>
      </Colors>
      <Settings />
    </Container>
  </ThemeProvider>
);

export default App;
