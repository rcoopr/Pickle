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
  background: ${p => p.theme.colors.secondary};
  padding-bottom: 203px;
`;

const PickerPane = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 53px;
  background: ${p => p.theme.colors.secondary};
  z-index: 2;
`;

const Watermark = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${p => p.theme.sizing.medium};
  font-size: ${p => p.theme.fonts.small};
  color: #00000066;
  z-index: 1;

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
      </Container>
      <Footer>
        <Palette />
        <Watermark>
          <a href="https://github.com/Froskk">
            <GithubLink icon={MarkGithub} verticalAlign="middle" ariaLabel="Github link" />
            <span>MADE BY ROSS COOPER</span>
          </a>
        </Watermark>
      </Footer>
    </ThemeProvider>
  </Provider>
);

export default App;
