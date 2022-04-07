import React from 'react'
import ToDoContainer from "./ToDoContainer";
import { render, waitFor } from '@testing-library/react'

describe("ToDo", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<ToDoContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();

  })
})