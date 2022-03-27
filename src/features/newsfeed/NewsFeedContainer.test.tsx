import React from 'react'
import NewsFeedContainer from "./NewsFeedContainer";
import { render, waitFor } from '@testing-library/react'

describe("NewsFeed", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<NewsFeedContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})