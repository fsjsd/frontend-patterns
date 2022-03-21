import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders TODO text', () => {
  render(<App />);
  const linkElement = screen.getByText(/TODO/i);
  expect(linkElement).toBeInTheDocument();
});
