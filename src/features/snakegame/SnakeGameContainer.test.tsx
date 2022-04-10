import React from 'react'
import SnakeGameContainer from "./SnakeGameContainer";
import { render, waitFor } from '@testing-library/react'

describe("SnakeGameContainer", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<SnakeGameContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})