import React from 'react';
import { render } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  test('renders without crashing', () => {
    const { container } = render(<InputText />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('renders error', () => {
    const { container } = render(<InputText error />);
    expect(container.firstChild).toMatchSnapshot();
  });
})