import React from 'react'
import ReactMemo from "./ReactMemo";
import { render, waitFor } from '@testing-library/react'

describe("ReactMemo", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<ReactMemo />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})