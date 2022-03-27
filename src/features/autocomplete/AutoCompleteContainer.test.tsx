import React from 'react'
import { render, waitFor } from '@testing-library/react'
import AutoCompleteContainer from './AutoCompleteContainer'

describe('AutoCompleteContainer', () => {
  test('render matches snapshot', async () => {
    const { queryByRole, container } = render(<AutoCompleteContainer />);
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot()
  })
})
