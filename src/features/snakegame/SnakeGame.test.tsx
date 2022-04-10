import React from 'react'
import SnakeGame from "./SnakeGame";
import { fireEvent, render, waitFor } from '@testing-library/react'
import { ViewMode } from './types';
import assert from 'assert';
import { INITIAL_SNAKE_SPEED } from './utils';
import 'jest-canvas-mock'; // need this directly in test files for CRA


describe("SnakeGame", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test.each([
    [ViewMode.Ascii],
    [ViewMode.Canvas],
    [ViewMode.Html],
  ])("%o mode renders and matches snapshot", async (viewMode) => {
    jest.useFakeTimers();
    const { container, queryByRole } = render(<SnakeGame viewMode={viewMode} />)
    await waitFor(() => expect(queryByRole("note")).toBeInTheDocument());
    await waitFor(() => expect(queryByRole("application")).toBeInTheDocument());

    const app = queryByRole("application");
    assert(app);
    expect(queryByRole("note")).toHaveTextContent("Score: 0. High Score: 0");

    fireEvent.keyUp(app, { key: "ArrowUp" });
    jest.advanceTimersByTime(INITIAL_SNAKE_SPEED);
    fireEvent.keyUp(app, { key: "ArrowLeft" });
    jest.advanceTimersByTime(INITIAL_SNAKE_SPEED);

    // TODO: spy on reducer and assert state change

    expect(container).toMatchSnapshot();
  });

  test("pressing t on keyboard cycles view mode", async () => {
    const { queryByRole, queryByTestId } = render(<SnakeGame viewMode={ViewMode.Html} />)
    await waitFor(() => expect(queryByRole("application")).toBeInTheDocument());
    const app = queryByRole("application");
    assert(app);
    expect(queryByTestId("asciitext")).not.toBeInTheDocument();
    fireEvent.keyUp(app, { key: "t" });
    expect(queryByTestId("asciitext")).toBeInTheDocument();
  });

  test("clicking game resets game", async () => {
    const { container, queryByRole } = render(<SnakeGame viewMode={ViewMode.Html} />)
    await waitFor(() => expect(queryByRole("application")).toBeInTheDocument());
    const app = queryByRole("application");
    assert(app);
    fireEvent.click(app);
    expect(container).toMatchSnapshot();
  });
})