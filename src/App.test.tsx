import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import AppShell from './AppShell';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('App tests', () => {
  const hostContext = "test"
  test('render matches snapshot (full screen)', () => {
    const { container } = render(<App hostContext={hostContext} />);
    const linkElement = screen.getByText(/Carousel/i);
    expect(linkElement).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test('AppShell render matches snapshot (full screen)', () => {
    const { container } = render(<AppShell />);
    expect(container).toMatchSnapshot();
  });
  test('shows menu in mobile mode', () => {
    const { container } = render(<App hostContext={hostContext} />);
    const menuButton = screen.getByRole('button', { name: 'Site navigation' });
    fireEvent.click(menuButton);
    expect(container).toMatchSnapshot();
  });
  test('Loads carousel', () => {
    const { container } = render(<App hostContext={hostContext} />);
    const carouselLink = screen.getByRole("link", { name: /Carousel/i });
    fireEvent.click(carouselLink);
    expect(container).toMatchSnapshot();
  });
  test('Should not violate a11y rules', async () => {
    const { container } = render(<App hostContext={hostContext} />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
})
