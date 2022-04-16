import React from 'react'
import ImgDynamicContainer from "./ImgDynamicContainer";
import { render, waitFor } from '@testing-library/react'
import { ImageError, ImageLoading, ImageWrapper } from './ImgDynamicStyles';

describe("ImgDynamic", () => {
  it("renders and matches snapshot", async () => {
    const { queryByRole, getByRole } = render(<ImgDynamicContainer imageCount={3} />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(getByRole("main")).toMatchSnapshot();
  })
  it("renders loading image without dimenstions", async () => {
    const { container } = render(<ImageLoading />)
    expect(container).toMatchSnapshot();
  })
  it("renders error image without dimenstions", async () => {
    const { container } = render(<ImageError />)
    expect(container).toMatchSnapshot();
  })
  it("renders error image without dimenstions", async () => {
    const { container } = render(<ImageWrapper />)
    expect(container).toMatchSnapshot();
  })

})