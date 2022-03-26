import React from 'react'
import { render } from '@testing-library/react'
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
      onLcp({ value: 1, metric_rating: "good" } as MetricInfo);
      onTtfb({ value: 1, metric_rating: "good" } as MetricInfo);
      onFid({ value: 1, metric_rating: "good" } as MetricInfo);
    },
  }
});

describe('WebVitals', () => {
  test('render matches snapshot', () => {
    const { container } = render(<WebVitals />);
    expect(container).toMatchSnapshot()
  })
});