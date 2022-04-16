import React from 'react'
import ReactDemoContainer from "./ReactDemoContainer";
import { render, waitFor } from '@testing-library/react'

describe("ReactDemoContainer", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<ReactDemoContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})