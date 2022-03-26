import React from 'react'
import { render } from '@testing-library/react'
import InfiniteScrollContainer from './InfiniteScrollContainer'

describe('InfiniteScrollContainer', () => {
  test.skip('render matches snapshot', async () => {
    const { container, queryAllByRole } = render(<InfiniteScrollContainer />)
    expect(container).toMatchSnapshot();
    const items = await queryAllByRole("listitem");
    expect(items.length).toBe(10)
  })
})
