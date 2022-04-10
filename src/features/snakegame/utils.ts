import { Coord, SnakeGameShape } from "./types";

export const BOARD_COLS = 21;
export const BOARD_ROWS = 21;

export const INITIAL_SNAKE_SPEED = 200;

export const INITIAL_SNAKE_COORDS: Coord[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 }
]


export const randomApplePos = (cols:number = BOARD_COLS, rows:number = BOARD_ROWS): Coord => {
  const x = Math.floor(Math.random() * cols);
  const y = Math.floor(Math.random() * rows);
  // TODO: Don't collide with existing snake coords
  // - Simple implementation would be load all snake coords
  //   into two Sets of x and y then while() on the random
  //   until a non-colliding coord is found.
  return { x, y };
}

export const isCoordEqual = (coord1: Coord, coord2: Coord) => {
  return coord1.x === coord2.x && coord1.y === coord2.y;
}

export const isSnakeCollision = (coord: Coord, snakeCoords: Coord[]) => {
  return snakeCoords.some(snakeCoord => isCoordEqual(snakeCoord, coord))
}


// implemented as function otherwise randomApplePos() invokes on declaration
// before unit tests can mock it out
export const initialState = (): SnakeGameShape => ({
  applePos: randomApplePos(),
  snakeCoords: INITIAL_SNAKE_COORDS,
  direction: 'ArrowUp',
  speedMs: null,
  score: 0,
  highScore: 0
})