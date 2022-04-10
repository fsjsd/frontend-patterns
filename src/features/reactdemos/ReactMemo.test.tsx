import React from "react";
import ReactMemo, { CounterABDeepMemo, CounterABMemo, CounterABUseMemo, CounterAMemo } from "./ReactMemo";
import { fireEvent, render, waitFor } from "@testing-library/react";

describe("ReactMemo", () => {
  it("renders and matches snapshot", async () => {
    const { container, queryByRole } = render(<ReactMemo />);
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it("changes state after increments", async () => {
    const { container, queryByRole, getByRole } = render(<ReactMemo />);
    await waitFor(() => expect(queryByRole("main")).toBeInTheDocument());
    expect(container).toMatchSnapshot();
    fireEvent.click(getByRole("button", { name: "Inc A" }));
    expect(container).toMatchSnapshot();
    fireEvent.click(getByRole("button", { name: "Inc B" }));
    expect(container).toMatchSnapshot();
    fireEvent.click(getByRole("button", { name: "Null state change" }));
    expect(container).toMatchSnapshot();
  });

  it("memo component does not re-render if props don't change", async () => {
    const props = { a: 1, b: 1 };
    const renderCount = jest.fn();
    const { rerender } = render(<CounterAMemo a={props.a} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);
    // re-assign props with same primitive value for 'a'
    props.a = 1;
    props.b = 2;
    rerender(<CounterAMemo a={props.a} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);
  });

  it("memo component re-renders if object prop changes (with same primitive values)", async () => {
    const props = { myObj: { a: 1, b: 1 } };
    const renderCount = jest.fn();
    const { rerender } = render(
      <CounterABMemo myObj={props.myObj} render={renderCount} />
    );
    expect(renderCount).toBeCalledTimes(1);
    rerender(<CounterABMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);

    // assign completely new object with same values
    props.myObj = { a: 1, b: 1 };
    rerender(<CounterABMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(2);
  });

  it("usememo component with custom comparator does not re-renders if object prop changes (with same primitive values)", async () => {
    const props = { myObj: { a: 1, b: 1 } };
    const renderCount = jest.fn();
    const { rerender } = render(
      <CounterABUseMemo myObj={props.myObj} render={renderCount} />
    );
    expect(renderCount).toBeCalledTimes(1);
    rerender(<CounterABUseMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);

    // assign completely new object with same values
    props.myObj = { a: 1, b: 1 };
    rerender(<CounterABUseMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);
  });

  it("memo component with deep comparator does not re-renders if object prop changes (with same primitive values)", async () => {
    const props = { myObj: { a: 1, b: 1 } };
    const renderCount = jest.fn();
    const { rerender } = render(
      <CounterABDeepMemo myObj={props.myObj} render={renderCount} />
    );
    expect(renderCount).toBeCalledTimes(1);
    rerender(<CounterABDeepMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);

    // assign completely new object with same values
    props.myObj = { a: 1, b: 1 };
    rerender(<CounterABDeepMemo myObj={props.myObj} render={renderCount} />);
    expect(renderCount).toBeCalledTimes(1);
  });




});
