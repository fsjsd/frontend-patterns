import React, { useLayoutEffect, useRef } from "react"
import { BoardViewProps, Coord, SnakeGameShape } from "./types"

const CELL_WIDTH = 20;

const centerCoord = (coord) => {
  return {
    x: (coord.x * CELL_WIDTH) + Math.floor(CELL_WIDTH / 2),
    y: (coord.y * CELL_WIDTH) + Math.floor(CELL_WIDTH / 2)
  };
}

const draw = (canvas: HTMLCanvasElement, rows: number, cols: number, cells: number[][], state: SnakeGameShape) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }
  ctx.clearRect(0, 0, rows * CELL_WIDTH, cols * CELL_WIDTH);

  ctx.lineWidth = CELL_WIDTH / 2;
  ctx.lineCap = 'round';
  ctx.miterLimit = 2;
  ctx.strokeStyle = '#cccccc';

  // Draw snake ...
  // could easily improve this by drawing a "head" for the snake
  state.snakeCoords.reduce((previous, coord) => {
    if (previous != null) {
      const lineCoord = centerCoord(coord);
      ctx.lineTo(lineCoord.x, lineCoord.y);
    } else {
      ctx.beginPath();
      const startPoint = centerCoord(coord);
      ctx.moveTo(startPoint.x, startPoint.y);
    }
    if (coord === state.snakeCoords.slice(-1).shift()) {
      ctx.stroke();
    }
    return coord;
  }, null as Coord | null);

  // Draw apple ...
  // could easily improve this by drawing an Apple shape with bezier curve funcs etc
  ctx.fillRect(state.applePos.x * CELL_WIDTH, state.applePos.y * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);

  /* 
  
  GitHub CoPilot generated this code in one go which is a 1:1 match to the HTML version!

  cells.forEach((row, i) => {
    row.forEach((_: number, j) => {
      const cellCoord = { x: j, y: i };
      if (isCoordEqual(state.applePos, cellCoord)) {
        ctx.fillStyle = 'red';
      } else if (isCoordEqual(state.snakeCoords[0], cellCoord)) {
        ctx.fillStyle = 'grey';
      } else if (state.snakeCoords.some(coord => isCoordEqual(coord, cellCoord))) {
        ctx.fillStyle = 'darkgrey';
      } else {
        ctx.fillStyle = 'white';
      }
      ctx.fillRect(j * CELL_WIDTH, i * CELL_WIDTH, CELL_WIDTH, CELL_WIDTH);
    });
  });

  */
}

// Specifically not memo'ing this. It will require re-render on the majority
// of prop changes.
const BoardCanvas = ({ rows, cols, cells, state }: BoardViewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      draw(canvasRef.current, rows, cols, cells, state)
    }
  }, [canvasRef, state]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <canvas
        ref={canvasRef}
        width={rows * CELL_WIDTH}
        height={cols * CELL_WIDTH}
      ></canvas>
    </div>
  )
}

export default BoardCanvas