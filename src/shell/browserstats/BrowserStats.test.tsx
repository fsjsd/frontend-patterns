import React from 'react'
import { render, waitFor, screen } from "@testing-library/react";
import BrowserStats, { fpsRating } from "./BrowserStats"
import { TRAFFIC_LIGHTS } from '../../utils/constants/colors';

const RealDate = Date;

describe('BrowserStats', () => {
  let startTime: number;
  beforeEach(() => {
    // 1555928430000 = new Date('2019-04-22T10:20:30Z').getTime()
    startTime = 1555928430000;
    global.Date.now = jest.fn(() => startTime);
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("renders and matches snapshot", async () => {
    const rafSpy = jest.spyOn(window, 'requestAnimationFrame');
    rafSpy.mockImplementation(
      (callback: FrameRequestCallback): number => {
        setTimeout(() => {
          callback(0);
          startTime += 1000; // add second to start time
        }, 1);
        return 0;
      });
    const { container } = render(<BrowserStats />)
    await waitFor(() => expect(screen.queryByLabelText("FPS")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
    rafSpy.mockRestore();
  });

  it.each([
    [0, TRAFFIC_LIGHTS.RED],
    [10, TRAFFIC_LIGHTS.RED],
    [50, TRAFFIC_LIGHTS.AMBER],
    [52, TRAFFIC_LIGHTS.AMBER],
    [60, TRAFFIC_LIGHTS.GREEN],
    [62, TRAFFIC_LIGHTS.GREEN]
  ])('shows %s color for %s value', async (fps, expectedColor) => {
    expect(fpsRating(fps)).toBe(expectedColor);
  })
});