import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import App from '../app';

test('renders learn react link', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const container = getByTestId('container');
  expect(container).toBeInTheDocument();
});
