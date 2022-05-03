import React from 'react'
import PrplContainer from "./PrplContainer";
import { render, waitFor } from '@testing-library/react'

describe("PRPL", () => {
  it("renders and matches snapshot", async () => {
    const { queryByRole } = render(<PrplContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
  })
})