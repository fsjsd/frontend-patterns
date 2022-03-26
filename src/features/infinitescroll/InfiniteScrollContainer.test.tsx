import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import InfiniteScrollContainer from './InfiniteScrollContainer'

describe('InfiniteScrollContainer', () => {
  test('render matches snapshot', async () => {
    const { container, getByRole, queryByRole, queryAllByRole } = render(<InfiniteScrollContainer />)
    await waitFor(() => expect(queryByRole("list")).toBeInTheDocument());
    const scrollWrapper = getByRole("list");
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    const items = await queryAllByRole("listitem");
    expect(items.length).toBe(5)

    expect(scrollWrapper.scrollTop).toBe(0);
    fireEvent.scroll(scrollWrapper, { target: { scrollTop: -10000 } });
    expect(scrollWrapper?.scrollTop).toBe(-10000);

    // await waitFor(() => expect(queryByRole("button", { name: "Load more" })?.getAttribute("disabled")).toBe("false"));
  })
})
