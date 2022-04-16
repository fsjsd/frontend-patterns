/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import ImgDynamic from './ImgDynamic';

const loading = <div>loading</div>
const error = <div>error</div>
const imageSize = 200;

const testImg = "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

describe("ImgDynamic", () => {

  let mockIntersectionObserver;
  beforeEach(() => {
    mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  })

  it("renders loading while image downloading", async () => {
    const { getByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={`loading ...`}
    />)
    await waitFor(() => expect(getByText("loading")).toBeInTheDocument());
  });

  it("renders image correctly", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Image = function () {
      const img = {
        onload
      } as HTMLImageElement;

      setTimeout(() => {
        img.onload && img.onload({} as Event);
      }, 10);
      return img
    }

    const { container, queryByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={testImg}
    />)

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    const calls = mockIntersectionObserver.mock.calls;
    const [onChange] = calls[calls.length - 1];
    onChange([{ isIntersecting: true, intersectionRatio: 0.5 }]);

    await waitFor(() => expect(queryByText("error")).not.toBeInTheDocument());
    await waitFor(() => expect(queryByText("loading")).not.toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })

  it("does not render image off screen", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Image = function () {
      const img = {
        onload
      } as HTMLImageElement;

      setTimeout(() => {
        img.onload && img.onload({} as Event);
      }, 10);
      return img
    }

    const { container, queryByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={testImg}
    />)

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    const calls = mockIntersectionObserver.mock.calls;
    const [onChange] = calls[calls.length - 1];
    onChange([{ isIntersecting: false, intersectionRatio: 0.5 }]);

    await waitFor(() => expect(queryByText("error")).not.toBeInTheDocument());
    await waitFor(() => expect(queryByText("loading")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })

  it("bad image renders error", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).Image = function () {
      const img = {
        onerror
      } as HTMLImageElement;

      setTimeout(() => {
        img.onerror && img.onerror({} as Event);
      }, 10);
      return img
    }

    const { queryByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={testImg}
    />)

    expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
    const calls = mockIntersectionObserver.mock.calls;
    const [onChange] = calls[calls.length - 1];
    onChange([{ isIntersecting: true, intersectionRatio: 0.5 }]);

    await waitFor(() => expect(queryByText("error")).toBeInTheDocument());
  })
})