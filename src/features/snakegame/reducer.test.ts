import { SnakeDirection, SnakeGameOperation, SnakeGameShape } from "./types";
import { snakeGameReducer } from "./reducer";
import { BOARD_COLS, BOARD_ROWS, initialState, INITIAL_SNAKE_SPEED } from "./utils";

describe("snakeGameReducer", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);
  });
  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("start sets interval speed", () => {
    const state = initialState();
    expect(state.speedMs).toEqual(null);
    expect(
      snakeGameReducer(state, { type: SnakeGameOperation.Start }).speedMs
    ).toEqual(INITIAL_SNAKE_SPEED);
  });
  
  test("should return the initial state", () => {
    expect(
      snakeGameReducer(initialState(), { type: SnakeGameOperation.Reset })
    ).toEqual(initialState());
  });

  test("should preserve high score after game reset", () => {
    expect(
      snakeGameReducer(
        {
          ...initialState(),
          highScore: 3,
        },
        { type: SnakeGameOperation.Reset }
      )
    ).toEqual({
      ...initialState(),
      highScore: 3,
    });
  });

  test.each([
    [SnakeDirection.ArrowUp, SnakeDirection.ArrowDown, SnakeDirection.ArrowUp],
    [
      SnakeDirection.ArrowUp,
      SnakeDirection.ArrowLeft,
      SnakeDirection.ArrowLeft,
    ],
    [
      SnakeDirection.ArrowDown,
      SnakeDirection.ArrowUp,
      SnakeDirection.ArrowDown,
    ],
    [
      SnakeDirection.ArrowDown,
      SnakeDirection.ArrowLeft,
      SnakeDirection.ArrowLeft,
    ],
    [
      SnakeDirection.ArrowLeft,
      SnakeDirection.ArrowRight,
      SnakeDirection.ArrowLeft,
    ],
    [SnakeDirection.ArrowLeft, SnakeDirection.ArrowUp, SnakeDirection.ArrowUp],
    [
      SnakeDirection.ArrowRight,
      SnakeDirection.ArrowLeft,
      SnakeDirection.ArrowRight,
    ],
    [SnakeDirection.ArrowRight, SnakeDirection.ArrowUp, SnakeDirection.ArrowUp],
  ])(
    "reverse direction is not allowed %o -> %o",
    async (currentDirection, intendedDirection, result) => {
      expect(
        snakeGameReducer(
          {
            ...initialState(),
            direction: currentDirection,
          },
          { type: intendedDirection }
        ).direction
      ).toEqual(result);
    }
  );

  test.each([
    [SnakeDirection.ArrowLeft, SnakeDirection.ArrowUp],
    [SnakeDirection.ArrowLeft, SnakeDirection.ArrowDown],
    [SnakeDirection.ArrowUp, SnakeDirection.ArrowLeft],
    [SnakeDirection.ArrowUp, SnakeDirection.ArrowRight],
  ])(
    "direction change moves snake - %o -> %o",
    async (currentDirection, intendedDirection) => {
      const stateStart = {
        ...initialState(),
        direction: currentDirection,
      };
      const stateAfterDirectionChange = snakeGameReducer(stateStart, {
        type: intendedDirection,
      });
      const stateAfterAdvance = snakeGameReducer(stateStart, {
        type: SnakeGameOperation.Advance,
      });

      expect(stateAfterDirectionChange.direction).toEqual(intendedDirection);
      expect(stateAfterAdvance.snakeCoords).toMatchSnapshot();
    }
  );

  test("apple collision wins round", () => {
    const state: SnakeGameShape = {
      ...initialState(),
      snakeCoords: [
        { x: 2, y: 2 },
        { x: 2, y: 1 },
        { x: 2, y: 0 },
      ],
      applePos: { x: 2, y: 3 },
      direction: SnakeDirection.ArrowDown,
    };
    expect(state.score).toEqual(0);
    expect(state.highScore).toEqual(0);

    const stateAfterAdvance = snakeGameReducer(state, {
      type: SnakeGameOperation.Advance,
    });
    expect(stateAfterAdvance.snakeCoords).toEqual([
      { x: 2, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 2, y: 0 },
    ]);
    expect(stateAfterAdvance.score).toEqual(1);
    expect(stateAfterAdvance.highScore).toEqual(1);
  });

  test.each([
    [SnakeDirection.ArrowUp, { x: 2, y: 0 }, { x: 2, y: 1 }],
    [SnakeDirection.ArrowLeft, { x: 0, y: 1 }, { x: 1, y: 1 }],
    [SnakeDirection.ArrowDown, { x: 2, y: BOARD_ROWS-1 }, { x: 2, y: BOARD_ROWS }],
    [SnakeDirection.ArrowRight, { x: BOARD_COLS-1, y: 1 }, { x: BOARD_COLS, y: 1 }],
  ])("round ends if boundary hit - %o", (direction, head, tail) => {
    const state: SnakeGameShape = {
      ...initialState(),
      speedMs: 200,
      snakeCoords: [
        head,
        tail,
      ],
      direction: direction,
    };

    const stateAfterAdvance = snakeGameReducer(state, {
      type: SnakeGameOperation.Advance,
    });
    // speed reset after round end / collision
    expect(stateAfterAdvance.speedMs).toBeNull();
    // snake reset
    expect(stateAfterAdvance.snakeCoords).toEqual(initialState().snakeCoords);
  });
});
