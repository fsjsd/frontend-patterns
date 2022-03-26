import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CarouselContainer from './CarouselContainer';

describe('CarouselContainer tests', () => {
  test('renders Carousel', () => {
    const { container } = render(<CarouselContainer />);
    expect(container).toMatchSnapshot();
  });
  test('forward advances slide', async () => {
    render(<CarouselContainer />);
    const slideContainer = screen.getByTestId("slidecontainer");
    const slide = screen.getByRole("tabpanel");
    expect(slide.offsetWidth).toBe(0);
    const firstTab = screen.getByRole('tab', { name: 'slide 1' });
    expect(firstTab.getAttribute("aria-selected")).toBe('true');
    expect(slideContainer.scrollLeft).toBe(0);
    const forwardButton = screen.getByRole('button', { name: 'forward' });
    fireEvent.click(forwardButton);
    expect(slideContainer.scrollLeft).toBe(-10);
    fireEvent.click(forwardButton);
    expect(slideContainer.scrollLeft).toBe(-20);
    fireEvent.click(forwardButton);
    expect(slideContainer.scrollLeft).toBe(0);
    //const secondTab = screen.getByRole('tab', { name: 'slide 2' });
    //expect(secondTab.getAttribute("aria-selected")).toBe('true');
  });

})
