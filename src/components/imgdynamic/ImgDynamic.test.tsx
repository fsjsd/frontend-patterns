/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import ImgDynamic from './ImgDynamic';
import { isNativeLazyLoadSupported } from './utils'

jest.mock('./utils');

const loading = <div>loading</div>
const error = <div>error</div>
const imageSize = 200;

const testImg = "data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7";

function setupImageMock(raiseOnLoadEvent: boolean, raiseOnErrorEvent: boolean) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).Image = function () {
    const img = {
      onload,
      onerror,
    } as HTMLImageElement;

    if (raiseOnLoadEvent) {
      setTimeout(() => {
        img.onload && img.onload({} as Event);
      }, 10);
    }

    if (raiseOnErrorEvent) {
      setTimeout(() => {
        img.onerror && img.onerror({} as Event);
      }, 10);
    }
    return img
  }
}


describe("ImgDynamic - native browser support", () => {
  let mockIntersectionObserver;
  beforeEach(() => {
    (isNativeLazyLoadSupported as jest.Mock).mockImplementation(() => true);
    mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  })

  it("renders image correctly", async () => {
    setupImageMock(true, false);
    (isNativeLazyLoadSupported as jest.Mock).mockImplementation(() => true);

    const { container, queryByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={testImg}
    />)

    expect(mockIntersectionObserver).not.toHaveBeenCalled();

    await waitFor(() => expect(queryByText("error")).not.toBeInTheDocument());
    const img = container.querySelector('#imgId');
    expect(img).not.toBeNull();
    expect(img).toHaveStyle("visibility: hidden")

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.load(img!);
    await waitFor(() =>
      expect(img).toHaveStyle("visibility: visible")
    );

    expect(container).toMatchSnapshot();
  })
  it("image error displays correctly", async () => {
    setupImageMock(true, false);
    (isNativeLazyLoadSupported as jest.Mock).mockImplementation(() => true);

    const { container, queryByText } = render(<ImgDynamic
      id={`imgId`}
      loadingComp={loading}
      errorComp={error}
      width={imageSize}
      height={imageSize}
      src={testImg}
    />)

    expect(mockIntersectionObserver).not.toHaveBeenCalled();

    await waitFor(() => expect(queryByText("error")).not.toBeInTheDocument());
    const img = container.querySelector('#imgId');
    expect(img).not.toBeNull();
    expect(img).toHaveStyle("visibility: hidden");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fireEvent.error(img!);
    await waitFor(() => expect(queryByText("error")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
});

describe("ImgDynamic - legacy browsers", () => {
  let mockIntersectionObserver;
  beforeEach(() => {
    (isNativeLazyLoadSupported as jest.Mock).mockImplementation(() => false);
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

  it("renders image correctly on legacy browsers", async () => {
    setupImageMock(true, false);

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

    await waitFor(() =>
      expect(container.querySelector('#imgId')).toHaveStyle("visibility: visible")
    );

    expect(container).toMatchSnapshot();
  })

  it("does not render image off screen", async () => {
    setupImageMock(true, false);

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
    setupImageMock(false, true);

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