import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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
  test('Should not violate a11y rules', async () => {
    const { container } = render(<App hostContext={hostContext} />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
})
