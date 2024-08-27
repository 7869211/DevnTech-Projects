import React from 'react';
import { render } from '@testing-library/react';
import App from './App'; // Adjust the import path as needed

test('renders App component correctly', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
