import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CarouselContainer from './CarouselContainer'

describe('CarouselContainer', () => {
  test('render matches snapshot', () => {
    const { container } = render(<CarouselContainer />)
    expect(container).toMatchSnapshot()
  })
  test('window resize recalculates layout', async () => {
    const { container } = render(<CarouselContainer />)
    global.dispatchEvent(new Event('resize'))
    expect(container).toMatchSnapshot()
  })
  test('forward advances slide', async () => {
    render(<CarouselContainer />)
    const slideContainer = screen.getByTestId('slidecontainer')
    const slide = screen.getAllByRole('tabpanel')
    expect(slide[0].offsetWidth).toBe(0)
    const firstTab = screen.getByRole('tab', { name: 'slide 1' })
    expect(firstTab.getAttribute('aria-selected')).toBe('true')
    expect(slideContainer.scrollLeft).toBe(0)
    const forwardButton = screen.getByRole('button', { name: 'forward' })
    fireEvent.click(forwardButton)
    expect(slideContainer.scrollLeft).toBe(-10)
    fireEvent.click(forwardButton)
    expect(slideContainer.scrollLeft).toBe(-20)
    fireEvent.click(forwardButton)
    //expect(slideContainer.scrollLeft).toBe(0);
    //const secondTab = screen.getByRole('tab', { name: 'slide 2' });
    //expect(secondTab.getAttribute("aria-selected")).toBe('true');
  })
  test('back advances slide', async () => {
    render(<CarouselContainer />)
    const slideContainer = screen.getByTestId('slidecontainer')
    const slide = screen.getAllByRole('tabpanel')
    expect(slide[0].offsetWidth).toBe(0)
    const firstTab = screen.getByRole('tab', { name: 'slide 1' })
    expect(firstTab.getAttribute('aria-selected')).toBe('true')
    expect(slideContainer.scrollLeft).toBe(0)
    const backButton = screen.getByRole('button', { name: 'back' })
    fireEvent.click(backButton)
    expect(slideContainer.scrollLeft).toBe(10)
    fireEvent.click(backButton)
    expect(slideContainer.scrollLeft).toBe(20)
  });
  test('slide indicator advances slide', async () => {
    render(<CarouselContainer />)
    screen.getByTestId('slidecontainer')
    const slide = screen.getAllByRole('tabpanel')
    expect(slide[0].offsetWidth).toBe(0)
    const firstTab = screen.getByRole('tab', { name: 'slide 2' })
    expect(firstTab.getAttribute('aria-selected')).toBe('false')
    fireEvent.click(firstTab)
  });

  test('views markdown article', () => {
    jest.mock("./requirements.md", () => "# Markdown test");
    const { container } = render(<CarouselContainer />)
    // Note "hidden:true" here is due to a bug in React Testing Library where
    // it doesn't respect window.resizeTo() operations to affect media queries.
    // Since the CSS for the app is mobile-first, these controls are hidden by the
    // default media query.
    //
    // see:
    // https://stackoverflow.com/questions/71553782/react-testing-library-is-ignoring-media-query-in-styled-component#_=_
    // https://github.com/testing-library/dom-testing-library/pull/352/files/7cdfcfa466774ca78940330fe95d00c9e744b673
    const notesButton = screen.getByRole('button', { name: 'View notes', hidden: true })
    fireEvent.click(notesButton);
    waitFor(() => expect(screen.getByRole('article')).toBeInTheDocument());
    // Same problem with hidden here
    const runButton = screen.getByRole('button', { name: 'Run demo', hidden: true })
    fireEvent.click(runButton);
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
});
