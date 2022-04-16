import React from 'react'
import TypeAheadContainer from "./TypeAheadContainer";
import { render, waitFor } from '@testing-library/react'

describe("TypeAhead", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<TypeAheadContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})