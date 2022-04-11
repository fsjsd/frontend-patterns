import React from 'react'
import NetflixContainer from "./NetflixContainer";
import { render, waitFor } from '@testing-library/react'

describe("Netflix", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<NetflixContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})