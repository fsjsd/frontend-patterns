import React from 'react';
import { render } from '@testing-library/react';
import AppPreload from './AppPreload';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

/**
 * Renders content for static html. 
 * 
 * Copy the output directly from the test snaphost into public/index.html,
 * note the CSS will require style tags and the HTML will require closing.
 * CSS keyframes will need to be manually copied.
 * 
 * IMPORTANT: Requires jest-styled-components to render CSS in usable
 * form.
 */

describe('AppPreload tests', () => {
  test('renders static preload html', () => {
    const { container } = render(<AppPreload />);
    expect(container.firstChild).toMatchSnapshot();
  });
})
