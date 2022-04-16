import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import DemoError from './DemoError';

describe('DemoError', () => {

  it('error response gracefully fails', async () => {
    jest.useFakeTimers();
    const onError = jest.fn();
    const { getByRole, queryByRole } = render(<DemoError onError={onError} />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    jest.advanceTimersByTime(300);
    await waitFor(() => expect(queryByRole("listbox")).not.toBeInTheDocument());
    expect(onError).toHaveBeenCalled();
  });

});