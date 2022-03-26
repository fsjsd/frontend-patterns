import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import WebVitals from './WebVitals'
import { MetricInfo, RegisterWebVitalsListenersProps } from './webVitalsUtils';

jest.mock("./webVitalsUtils", () => {
  const originalModule = jest.requireActual('./webVitalsUtils');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    registerWebVitalsListeners: ({
      onCls,
      onFcp,
      onLcp,
      onTtfb,
      onFid, }: RegisterWebVitalsListenersProps) => {
      onCls({ value: 1, metric_rating: "good" } as MetricInfo);
      onFcp({ value: 1, metric_rating: "poor" } as MetricInfo);
      onLcp({ value: 1, metric_rating: "poor" } as MetricInfo);
      onTtfb({ value: 1, metric_rating: "ni" } as MetricInfo);
      onFid({ value: 1, metric_rating: "" } as MetricInfo);
    },
  }
});

describe('WebVitals', () => {
  test('render matches snapshot', () => {
    const { container } = render(<WebVitals />);
    expect(container).toMatchSnapshot()
  });
  test.each([
    ["LCP", 0, "Largest Contentful Paint"],
    ["FID", 1, "First Input Delay"],
    ["CLS", 2, "Cumulative Layout Shift"],
    ["TTFB", 3, "Time to first byte"],
    ["FCP", 4, "First Contentful Paint"],
  ])('shows tooltip on mouseover %o', (ariaLabel, position, tooltipText) => {
    render(<WebVitals />);
    const fidLabel = screen.getAllByLabelText(ariaLabel);
    expect(fidLabel).toHaveLength(1);
    const tooltips = screen.getAllByRole("tooltip");
    expect(tooltips).toHaveLength(5);
    expect(tooltips[position]).toHaveTextContent(tooltipText);
    expect(tooltips[position].className).toContain("invisible");
    fireEvent.mouseOver(fidLabel[0]);
    expect(tooltips[position].className).not.toContain("invisible")
    expect(tooltips[position]).toMatchSnapshot();
    fireEvent.mouseLeave(fidLabel[0]);
    expect(tooltips[position].className).toContain("invisible");
  });

});