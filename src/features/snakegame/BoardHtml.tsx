import React from 'react'
import styled from 'styled-components';
import { BoardViewProps, Coord, SnakeGameShape } from './types';
import { isCoordEqual } from './utils';


const cellColor = (state: SnakeGameShape, cellCoord: Coord) => {
  if (isCoordEqual(state.applePos, cellCoord)) {
    return 'red';
  }
  if (isCoordEqual(state.snakeCoords[0], cellCoord)) {
    return 'grey';
  }
  if (state.snakeCoords.some(coord => isCoordEqual(coord, cellCoord))) {
    return 'darkgrey';
  }
  return 'white';
}

const Grid = styled.div<{ width: number, height: number }>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  display: inline-flex;
  flex-wrap: wrap;
`;

/**
 * Most cells are blank, so we'll memo to prevent re-rendering expect where
 * the snake / apple changes colors. This has a big impact on browser performance
 * to prevent unnecessary re-rendering.
 */
const Cell = React.memo(styled.div<{ bgcolor: string, size: number }>`
  width:${props => props.size}px;
  height:${props => props.size}px;
  background-color: ${props => props.bgcolor};
  display: inline-block;
`);

const CELL_WIDTH = 20;

const BoardHtml = ({ rows, cols, cells, state }: BoardViewProps) => {
  return (
    <Grid
      width={rows * CELL_WIDTH} height={cols * CELL_WIDTH}
    >
      {cells.map((row, i) => row.map(
        (_: number, j: number) =>
          <Cell
            size={CELL_WIDTH}
            data-testid={`${i}, ${j}`}
            key={`${i}, ${j}`}
            bgcolor={cellColor(state, { x: j, y: i })}
          />)
      )}
    </Grid>
  )
}

export default BoardHtml