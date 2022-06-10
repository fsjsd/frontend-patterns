import React from 'react'
import { render, waitFor } from '@testing-library/react'
import InfiniteScrollContainer from './InfiniteScrollContainer'

describe('InfiniteScrollContainer', () => {
  test.skip('render matches snapshot', async () => {
    const { container, queryByRole } = render(<InfiniteScrollContainer />)
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  })
})
