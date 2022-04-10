import React from "react"
import { BoardViewProps } from "./types"
import { isCoordEqual } from "./utils";

const BoardAscii = ({ cells, state }: BoardViewProps) => {
  return (
    <pre data-testid="asciitext" style={{ backgroundColor: 'white', fontSize: '18px', lineHeight: '10px' }}>
      {cells.map(
        (row, i) => row.map(
          (_: number, j: number) => {
            const cellCoord = { x: j, y: i };
            if (isCoordEqual(state.applePos, cellCoord)) {
              return '*';
            }
            if (isCoordEqual(state.snakeCoords[0], cellCoord)) {
              return 'o';
            }
            if (state.snakeCoords.some(coord => isCoordEqual(coord, cellCoord))) {
              return '.';
            }
            return " ";
          }
        ).join('') + '\n'
      )}
    </pre>
  )
}

export default BoardAscii