import React from 'react';
import { render } from '@testing-library/react';
import SearchBar from '../Components/SearchBar';

test('SearchBar renders correctly', () => {
  const { asFragment } = render(<SearchBar searchTerm="test" setSearchTerm={() => {}} isError={false} />);
  expect(asFragment()).toMatchSnapshot();
});