import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App tests', () => {
  test('renders TODO text', () => {
    render(<App />);
    const linkElement = screen.getByText(/Carousel/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('Loads carousel', () => {
    render(<App />);
    const carouselLink = screen.getByRole("link", { name: /Carousel/i });
    fireEvent.click(carouselLink);
  });

})
