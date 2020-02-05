import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import GlobalStyles from 'globalStyles';

import Octicon, { MarkGithub } from '@primer/octicons-react';

import { Header } from 'components/header';
import { Picker } from 'components/picker';
import { Palette } from 'components/palette';
// import { Controls } from 'components/controls';

const Container = styled.main`
  display: flex;
  min-height: calc(100vh - 140px);
  background: ${p => p.theme.colors.secondary};
`;

const Pane = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Colors = styled(Pane)``;

const Settings = styled(Pane)`
  background: ${p => p.theme.colors.primary};
  display: flex;
  flex-direction: column;
`;

const PickerCard = styled.div`
  display: flex;
  align-items: center;
  margin: ${p => p.theme.sizing.large};
  border-radius: 12px;
  box-shadow: 0 0.2px 0.4px rgba(0, 0, 0, 0.024), 0 0.6px 1px rgba(0, 0, 0, 0.035),
    0 1.5px 2.4px rgba(0, 0, 0, 0.046), 0 5px 8px rgba(0, 0, 0, 0.07);
`;

const Details = styled.ul`
  margin: ${p => p.theme.sizing.large};
  margin-left: 0;
  width: max-content;
  line-height: ${p => p.theme.fonts.larger};
  font-size: ${p => p.theme.fonts.small};
  list-style: none;
`;

const Footer = styled.footer`
  background: ${p => p.theme.colors.secondary};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05);
`;

const Watermark = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${p => p.theme.sizing.medium};
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
          <Details>
            <li>H: 191</li>
            <li>S: 83%</li>
            <li>L: 52%</li>
          </Details>
        </PickerCard>
      </Colors>
      <Settings />
      <Footer>
        <Palette />
        <Watermark>
          <a href="https://github.com/Froskk">
            <GithubLink icon={MarkGithub} verticalAlign="middle" ariaLabel="Github link" />
            <span>MADE BY ROSS COOPER</span>
          </a>
        </Watermark>
      </Footer>
    </Container>
  </ThemeProvider>
);

export default App;
