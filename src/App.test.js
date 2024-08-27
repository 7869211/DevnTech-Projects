import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainComponent from './Components/MainComponent';
describe('MainComponent', () => {
  test('renders all tags correctly', () => {
    render(<MainComponent />);
    
    
    expect(screen.getByText(/Languages/i)).toBeInTheDocument();
    expect(screen.getByText(/Build/i)).toBeInTheDocument();
    expect(screen.getByText(/Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloud/i)).toBeInTheDocument();
  });

  test('renders the search bar', () => {
    render(<MainComponent />);
    expect(screen.getByPlaceholderText(/Search technologies we use at DC.../i)).toBeInTheDocument();
  });

  test('shows the loading state correctly', async () => {
    render(<MainComponent />);
    
    // Simulate typing in the search bar to trigger the loading state
    fireEvent.change(screen.getByPlaceholderText(/Search technologies we use at DC.../i), {
      target: { value: 'React' },
    });

    // The loading text should appear
    expect(await screen.findByText(/Searching.../i)).toBeInTheDocument();
  });

  test('displays no results message when there are no search results', async () => {
    render(<MainComponent />);

    // Simulate a search term that would result in no matches
    fireEvent.change(screen.getByPlaceholderText(/Search technologies we use at DC.../i), {
      target: { value: 'nonexistent search term' },
    });

    await waitFor(() => {
      expect(screen.getByText(/Something wrong happened but this is not your fault :\)/i)).toBeInTheDocument();
    });
  });

  test('displays the current time', () => {
    render(<MainComponent />);
    
    // The time should be displayed in the footer
    expect(screen.getByText(/:/)).toBeInTheDocument();
  });
});
