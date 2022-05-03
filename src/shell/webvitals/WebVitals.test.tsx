import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import WebVitals from './WebVitals'

jest.mock("./webVitalsUtils");

describe('WebVitals', () => {
  test('render matches snapshot', () => {
    const { container } = render(<WebVitals />);
    expect(container).toMatchSnapshot()
  });
  test.each([
    ["TTFB", 0, "Time to first byte"],
    ["FCP", 1, "First Contentful Paint"],
    ["LCP", 2, "Largest Contentful Paint"],
    ["FID", 3, "First Input Delay"],
    ["CLS", 4, "Cumulative Layout Shift"],
  ])('shows tooltip on mouseover %o', (ariaLabel, position, tooltipText) => {
    render(<WebVitals />);
    const fidLabel = screen.getAllByLabelText(ariaLabel);
    expect(fidLabel).toHaveLength(1);
    const tooltips = screen.getAllByRole("tooltip", { hidden: true });
    expect(tooltips).toHaveLength(5);
    expect(tooltips[position]).toHaveTextContent(tooltipText);
    expect(tooltips[position].getAttribute("aria-hidden")).toBe("true");
    fireEvent.mouseOver(fidLabel[0]);
    expect(tooltips[position].getAttribute("aria-hidden")).toBe("false");
    expect(tooltips[position]).toMatchSnapshot();
    fireEvent.mouseLeave(fidLabel[0]);
    expect(tooltips[position].getAttribute("aria-hidden")).toBe("true");
  });

});