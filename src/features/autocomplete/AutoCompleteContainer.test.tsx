import React from 'react'
import { render } from '@testing-library/react'
import AutoCompleteContainer from './AutoCompleteContainer'

describe('AutoCompleteContainer', () => {
  test('render matches snapshot', () => {
    const { container } = render(<AutoCompleteContainer />)
    expect(container).toMatchSnapshot()
  })
})
