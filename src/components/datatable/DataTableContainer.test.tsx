import React from 'react'
import DataTableContainer from "./DataTableContainer";
import { render, waitFor } from '@testing-library/react'

describe("Data Table", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<DataTableContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})