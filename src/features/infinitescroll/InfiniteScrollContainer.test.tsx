import React from 'react'
import { render } from '@testing-library/react'
import InfiniteScrollContainer from './InfiniteScrollContainer'

describe('InfiniteScrollContainer', () => {
  test('render matches snapshot', () => {
    const { container } = render(<InfiniteScrollContainer />)
    expect(container).toMatchSnapshot()
  })
})
