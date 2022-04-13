import React from 'react'
import PhotoEditorContainer from "./PhotoEditorContainer";
import { render, waitFor } from '@testing-library/react'

describe("Photo Editor", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<PhotoEditorContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})