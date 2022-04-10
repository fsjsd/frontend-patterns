import { Coord, SnakeDirection, SnakeGameAction, SnakeGameOperation, SnakeGameShape } from "./types";
import { BOARD_COLS, BOARD_ROWS, initialState, INITIAL_SNAKE_COORDS, INITIAL_SNAKE_SPEED, isCoordEqual, isSnakeCollision, randomApplePos } from "./utils";

type ReducerMap = { 
  [key in SnakeDirection | SnakeGameOperation]: (state: SnakeGameShape) => SnakeGameShape
}

export const snakeGameReducer = (state: SnakeGameShape, action: SnakeGameAction) => {
  const reducerMap: ReducerMap = {
    [SnakeDirection.ArrowUp]: (state: SnakeGameShape) => {
      if(state.direction === SnakeDirection.ArrowDown) {
        return state;
      }
      return {
        ...state,
        direction: SnakeDirection.ArrowUp
      }
    },
    [SnakeDirection.ArrowDown]: (state: SnakeGameShape) => {
      if(state.direction === SnakeDirection.ArrowUp) {
        return state;
      }
      return {
        ...state,
        direction: SnakeDirection.ArrowDown
      }
    },
    [SnakeDirection.ArrowLeft]: (state: SnakeGameShape) => {
      if(state.direction === SnakeDirection.ArrowRight) {
        return state;
      }
      return {
        ...state,
        direction: SnakeDirection.ArrowLeft
      }
    },
    [SnakeDirection.ArrowRight]: (state: SnakeGameShape) => {
      if(state.direction === SnakeDirection.ArrowLeft) {
        return state;
      }
      return {
        ...state,
        direction: SnakeDirection.ArrowRight
      }
    },
    [SnakeGameOperation.Reset]: () => {
      return {
        ...initialState(),
        highScore: state.highScore
      }
    },
    [SnakeGameOperation.Start]: (state: SnakeGameShape) => {
      return {
        ...state,
        speedMs: INITIAL_SNAKE_SPEED
      }
    },
    [SnakeGameOperation.Advance]: (state: SnakeGameShape) => {
      let newSnakeCoords = state.snakeCoords.slice();
      const prevHead = state.snakeCoords[0];
      let newHead: Coord | null = null;
      let hitSomething = false;
    
      switch (state.direction) {
        case 'ArrowUp':
          newHead = { ...prevHead, y: prevHead.y - 1 };
          if (prevHead.y === 0) { //at border
            hitSomething = true; 
          } else {
            newSnakeCoords = [
              newHead,
              ...state.snakeCoords.slice(0, state.snakeCoords.length - 1)
            ]
          }
          break;
        case 'ArrowDown':
          newHead = { ...prevHead, y: prevHead.y + 1, };
          if (prevHead.y === BOARD_ROWS - 1 ) { //at border
            hitSomething = true;
          } else {
            newSnakeCoords = [
              newHead,
              ...state.snakeCoords.slice(0, state.snakeCoords.length - 1)
            ]
          }
          break;
        case 'ArrowLeft':
          newHead = { ...prevHead, x: prevHead.x - 1, };
          if (prevHead.x === 0) { //at border
            hitSomething = true;
          } else {
            newSnakeCoords = [
              newHead,
              ...state.snakeCoords.slice(0, state.snakeCoords.length - 1)
            ]
          }
          break;
        case 'ArrowRight':
          newHead = { ...prevHead, x: prevHead.x + 1, };
          if (prevHead.x === BOARD_COLS - 1) {
            hitSomething = true;
          } else {
            newSnakeCoords = [
              newHead,
              ...state.snakeCoords.slice(0, state.snakeCoords.length - 1)
            ]
          }
          break;
      }
    
      let newApplePos = state.applePos;
      let newSpeed: number | null = state.speedMs ?? INITIAL_SNAKE_SPEED;
      let score = state.score;
      let newDirection = state.direction;
      let newHighScore = state.highScore;
    
      // BUG: if snake reverses, will die
      if(newHead !== null && !hitSomething) { // micro optimisation if we know there's already a collision
        // this looks at all previous snake coords to detect collision, since newHead
        // will be in new cell
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hitSomething = isSnakeCollision(newHead!, state.snakeCoords)
      }

      // Hits apple
      if (newHead && isCoordEqual(newHead, state.applePos)) {
        newSpeed = newSpeed * 0.9;
        // new applepos
        newApplePos = randomApplePos();
        // append old tail to extend tail
        newSnakeCoords = [
          ...newSnakeCoords,
          state.snakeCoords[state.snakeCoords.length - 1]
        ]
        // increase score
        score = score + 1;

        // increase high score
        if(score > state.highScore){
          newHighScore = score;
        }
      }

      if (hitSomething) {
        newSpeed = null;
        newApplePos = randomApplePos();
        newSnakeCoords = INITIAL_SNAKE_COORDS;
        score = 0;
        newDirection = SnakeDirection.ArrowUp;
      }
    
      return {
        speedMs: newSpeed,
        direction: newDirection,
        applePos: newApplePos,
        snakeCoords: newSnakeCoords,
        score,
        highScore: newHighScore
      };
    },
  }

  if(reducerMap[action.type]) {
    return reducerMap[action.type](state);
  }
  
  return state;
};