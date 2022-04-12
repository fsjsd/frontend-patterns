import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import UniversitySearchDemo from './UniversitySearchDemo';

describe('UniversitySearch', () => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of Sydney",
          "web_pages": [
            "http://sydney.edu.au/"
          ],
          "domains": [
            "sydney.edu.au",
            "usyd.edu.au",
            "uni.sydney.edu.au"
          ],
          "alpha_two_code": "AU"
        },
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of South Australia",
          "web_pages": [
            "http://www.unisa.edu.au/"
          ],
          "domains": [
            "unisa.edu.au"
          ],
          "alpha_two_code": "AU"
        },
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of Southern Queensland",
          "web_pages": [
            "http://www.usq.edu.au/"
          ],
          "domains": [
            "usq.edu.au"
          ],
          "alpha_two_code": "AU"
        },
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of Wollongong",
          "web_pages": [
            "http://www.uow.edu.au/"
          ],
          "domains": [
            "uow.edu.au"
          ],
          "alpha_two_code": "AU"
        },
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of Western Australia",
          "web_pages": [
            "http://www.uwa.edu.au/"
          ],
          "domains": [
            "uwa.edu.au"
          ],
          "alpha_two_code": "AU"
        },
        {
          "state-province": null,
          "country": "Australia",
          "name": "University of Western Sydney",
          "web_pages": [
            "http://www.uws.edu.au/"
          ],
          "domains": [
            "uws.edu.au"
          ],
          "alpha_two_code": "AU"
        }
      ]),
    }),
  ) as jest.Mock;

  beforeEach(() => {
    (globalThis.fetch as jest.Mock).mockClear();
  });

  it('renders and matches snapshot', async () => {
    const { container, queryByLabelText } = render(<UniversitySearchDemo />)
    await waitFor(() => expect(queryByLabelText("Search Australian Universities")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('typing less than 3 chars does nothing', async () => {
    const { container, getByRole } = render(<UniversitySearchDemo />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "ab" } });
    expect(container).toMatchSnapshot();
  });

  it('valid query triggers result query', async () => {
    const { container, getByRole, queryByRole } = render(<UniversitySearchDemo />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University of" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

})