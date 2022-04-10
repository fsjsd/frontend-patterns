import React from 'react'
import MessengerContainer from "./MessengerContainer";
import { render, waitFor } from '@testing-library/react'

describe("Messenger", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<MessengerContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})