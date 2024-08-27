import React from 'react';
import { render } from '@testing-library/react';
import TagComponent from '../Components/TagComponent'; 

test('TagComponent renders correctly', () => {
  const { asFragment } = render(<TagComponent text="Test Tag" onClick={() => {}} isActive={false} />);
  expect(asFragment()).toMatchSnapshot();
});
