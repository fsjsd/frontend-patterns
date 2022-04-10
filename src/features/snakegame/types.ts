
/**
 * Represents coordinate on the board
 */
export interface Coord {
  x: number,
  y: number
}

/**
 * State shape for the game
 */
export interface SnakeGameShape {
  /**
   * 'Speed' of the snake, in milliseconds. null infers that the game is paused.
   */
  speedMs: number | null,
  /**
   * Current direction of the snake
   */
  direction: string,
  /**
   * Position of the Apple
   */
  applePos: Coord,
  /**
   * Snake's coordinates on the board
   */
  snakeCoords: Coord[];
  /**
   * Score for current round
   */
  score: number;
  /**
   * Score for current round
   */
  highScore: number;
} 

export enum SnakeDirection {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export enum SnakeGameOperation {
  Reset = 'Reset',
  Advance = 'Advance',
  Start = 'Start'
}

export type SnakeGameActionType = SnakeGameOperation | SnakeDirection;

export interface SnakeGameAction {
  type: SnakeGameActionType,
  payload?: unknown
}

export interface BoardViewProps {
  rows: number,
  cols: number,
  cells: number[][],
  state: SnakeGameShape
}


export enum ViewMode {
  Html = 'html',
  Ascii = 'ascii',
  Canvas = 'canvas'
}