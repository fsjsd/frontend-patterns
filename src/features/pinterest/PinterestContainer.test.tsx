import React from 'react'
import PinterestContainer from "./PinterestContainer";
import { render, waitFor } from '@testing-library/react'

describe("Pinterest", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<PinterestContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})