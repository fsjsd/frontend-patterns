import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  const hostContext = "test"
  test('renders TODO text', () => {
    render(<App hostContext={hostContext} />);
    const linkElement = screen.getByText(/Carousel/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Loads carousel', () => {
    render(<App hostContext={hostContext} />);
    const carouselLink = screen.getByRole("link", { name: /Carousel/i });
    fireEvent.click(carouselLink);
  });

})
