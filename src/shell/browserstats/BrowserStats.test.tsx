import React from 'react'
import { render } from "@testing-library/react";
import BrowserStats from "./BrowserStats"

describe('BrowserStats', () => {
  it("renders and matches snapshot", () => {
    const { container } = render(<BrowserStats />)
    expect(container).toMatchSnapshot();
  })
});