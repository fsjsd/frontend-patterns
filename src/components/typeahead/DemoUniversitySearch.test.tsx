import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import DemoUniversitySearch from './DemoUniversitySearch';
import fetchMock from 'jest-fetch-mock'

// fetch mock issues:
// https://github.com/jefflau/jest-fetch-mock/issues/194

const mockResponse = [
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
];

describe('UniversitySearch', () => {
  let events: Record<string, (e: unknown) => void> = {};
  beforeAll(() => {
    fetchMock.enableMocks();
  })

  afterAll(() => {
    fetchMock.disableMocks();
  })

  beforeEach(() => {
    // Empty our events before each test case
    events = {};

    // Define the addEventListener method with a Jest mock function
    window.addEventListener = jest.fn((event, callback) => {
      events[event] = callback as () => unknown;
    });

    window.removeEventListener = jest.fn((event) => {
      delete events[event];
    });
  });

  it('renders and matches snapshot', async () => {
    const { container, queryByLabelText } = render(<DemoUniversitySearch />)
    await waitFor(() => expect(queryByLabelText("Search Australian Universities")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('typing less than 3 chars does nothing', async () => {
    const { container, getByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "ab" } });
    expect(container).toMatchSnapshot();
  });

  it('valid query triggers result query', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    fireEvent.change(input, { target: { value: "University of" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('no response renders correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    expect(container).toHaveTextContent("No results")
    expect(container).toMatchSnapshot();
  });

  it('document click closes typeahead', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    fireEvent.change(input, { target: { value: "University of" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    events.click({ target: null });
    await waitFor(() => expect(queryByRole("listbox")).not.toBeInTheDocument());
  });

  it('input blur does not closes typeahead', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    fireEvent.blur(input);
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
  });

  it('input click does not close typeahead', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    fireEvent.change(input, { target: { value: "University of" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    events.click({ target: input });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
  });

  it.each(
    [
      ['ArrowUp', 0],
      ['ArrowDown', 2]
    ]
  )('navigates on key press %o', async (keyCode, index) => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: keyCode });

    const item = container.querySelector(`#university-search-option-${index}`);
    expect(item).toBeInTheDocument();
    expect(item?.getAttribute("aria-selected")).toBe("true");
    /*
      id="university-search-option-{index}"
      role="option"
      aria-selected="true"
    */
    expect(container).toMatchSnapshot();
  });

  it('arrow up selects first result', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    const item = container.querySelector(`#university-search-option-0`);
    expect(item).toBeInTheDocument();
    expect(item?.getAttribute("aria-selected")).toBe("false");
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(item?.getAttribute("aria-selected")).toBe("true");
    expect(container).toMatchSnapshot();
  });

  it('arrow down has no effect at end', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    const item = container.querySelector(`#university-search-option-${mockResponse.length - 1}`);
    expect(item).toBeInTheDocument();
    expect(item?.getAttribute("aria-selected")).toBe("false");
    new Array(mockResponse.length).fill(null).forEach(() => fireEvent.keyDown(input, { key: 'ArrowDown' }));
    expect(item?.getAttribute("aria-selected")).toBe("true");
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(item?.getAttribute("aria-selected")).toBe("true");
    expect(container).toMatchSnapshot();
  });

  it.each(
    [
      ['Tab'],
      ['Escape']
    ]
  )('%o closes typeahead', async (keyCode) => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const { getByRole, queryByRole } = render(<DemoUniversitySearch />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    fireEvent.keyDown(input, { key: keyCode });
    expect(queryByRole("listbox")).not.toBeInTheDocument()
    fireEvent.focus(input);
    expect(queryByRole("listbox")).toBeInTheDocument()
  });

  it('press Enter result raises event', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const handleOnSelect = jest.fn();
    const { getByRole, queryByRole } = render(<DemoUniversitySearch onSelect={handleOnSelect} />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleOnSelect).toHaveBeenCalledTimes(1);
  });

  it('clicking result raises event', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const handleOnSelect = jest.fn();
    const { container, getByRole, queryByRole } = render(<DemoUniversitySearch onSelect={handleOnSelect} />)
    const input = await getByRole("textbox");
    fireEvent.change(input, { target: { value: "University o" } });
    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument());
    const item = container.querySelector(`#university-search-option-0`);
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(handleOnSelect).toHaveBeenCalledTimes(1);
  });

  it('selecting without result does not raise event', async () => {
    const handleOnSelect = jest.fn();
    const { getByRole } = render(<DemoUniversitySearch onSelect={handleOnSelect} />)
    const input = await getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(handleOnSelect).toHaveBeenCalledTimes(0);
  });

  //onSelect
})