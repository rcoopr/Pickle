import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'theme';
import GlobalStyles from 'globalStyles';
import { Provider } from 'react-redux';
import store from 'redux/store';

import Octicon, { MarkGithub } from '@primer/octicons-react';
import { Header } from 'components/header';
import { Palette } from 'components/palette';
import { Settings } from 'components/settings';
import { Picker } from 'components/picker';

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  background: ${p => p.theme.colors.secondary};
`;

const Pane = styled.section`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PickerPane = styled(Pane)`
  padding-bottom: 150px;
`;

const Footer = styled.footer`
  background: ${p => p.theme.colors.secondary};
  position: fixed;
  bottom: 53px;
  left: 0;
  right: 0;
  box-shadow: 0 -0.9px 2.2px rgba(0, 0, 0, 0.017), 0 -2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 -5.3px 13.5px rgba(0, 0, 0, 0.033), 0 -23px 54px rgba(0, 0, 0, 0.05),
    0 0.9px 2.2px rgba(0, 0, 0, 0.017), 0 2.3px 5.7px rgba(0, 0, 0, 0.025),
    0 5.3px 13.5px rgba(0, 0, 0, 0.033), 0 23px 54px rgba(0, 0, 0, 0.05);
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

    &:hover {
      text-decoration: underline;
    }
  }
`;

const GithubLink = styled(Octicon)`
  margin-right: 0.4em;
  font-size: 2em;
  width: ${p => p.theme.fonts.larger};
  height: ${p => p.theme.fonts.larger};
`;

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container data-testid="container">
        <PickerPane>
          <Header />
          <Picker />
        </PickerPane>
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
  </Provider>
);

export default App;
