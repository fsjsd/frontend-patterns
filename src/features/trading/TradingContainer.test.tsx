import React from 'react'
import TradingContainer from "./TradingContainer";
import { render, waitFor } from '@testing-library/react'

describe("Trading", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<TradingContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})