import React from 'react'
import { render } from '@testing-library/react'
import NotImplementedException from './NotImplementedException'

describe('NotImplementedException', () => {
  test('render matches snapshot', () => {
    const { container } = render(<NotImplementedException />)
    expect(container).toMatchSnapshot()
  })
})
