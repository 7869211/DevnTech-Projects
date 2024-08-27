import React from 'react';
import { render } from '@testing-library/react';
import MainComponent from '../Components/MainComponent'; 

test('MainComponent renders correctly', () => {
  const { asFragment } = render(<MainComponent />);
  expect(asFragment()).toMatchSnapshot();
});
