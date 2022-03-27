import React from 'react'
import PollContainer from "./PollContainer";
import { render, waitFor } from '@testing-library/react'

describe("Poll", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<PollContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})