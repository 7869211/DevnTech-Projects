import React from 'react';
import { render } from '@testing-library/react';
import ResultItems from '../Components/ResultItems';

jest.mock('../Icons/VectorIcon', () => () => <div data-testid="vector-icon">Mocked Vector Icon</div>);

const mockResults = [
  {
    title: 'Test Title 1',
    description: 'Test Description 1',
    image: 'test-image-1.jpg',
    url: 'https://example.com/1',
  },
  {
    title: 'Test Title 2',
    description: 'Test Description 2',
    image: 'test-image-2.jpg',
    url: 'https://example.com/2',
  },
];

test('ResultItems renders correctly with VectorIcon', () => {
  const { asFragment } = render(<ResultItems results={mockResults} />);
  expect(asFragment()).toMatchSnapshot();
});
