import React from 'react';
import { render } from '@testing-library/react';
import App from '../app';

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const container = getByTestId('container');
  expect(container).toBeInTheDocument();
});
