import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components';
import BoardAscii from './BoardAscii';
import BoardCanvas from './BoardCanvas';
import BoardHtml from './BoardHtml';
import { snakeGameReducer } from './reducer';
import { SnakeDirection, SnakeGameOperation, ViewMode } from './types';
import { initialState, INITIAL_SNAKE_SPEED } from './utils';

const GameWrapper = styled.div`
  outline:none;
  display:inline-block;
`

const Section = styled.section`
  padding:10px;
`;

const rows = 21;
const cols = 21;

const cells = Array.from(
  Array(rows).keys()).map(() => Array.from(
    Array(cols).keys()).map(() => (0))
  );

/**
 * Snake Game Container
 */
const SnakeGame = ({ viewMode }: { viewMode: ViewMode }) => {
  const [viewType, setViewType] = useState<ViewMode>(viewMode)
  const [state, dispatch] = useReducer(snakeGameReducer, initialState());

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.speedMs !== null) {
        dispatch({ type: SnakeGameOperation.Advance });
      }
    }, state.speedMs ?? INITIAL_SNAKE_SPEED);
    return () => {
      clearInterval(interval);
    }
  }, [state.speedMs])

  const handleGridKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "t") {
      const views = [ViewMode.Ascii, ViewMode.Canvas, ViewMode.Html];
      setViewType(prev => views[(views.indexOf(prev) + 1) % views.length]);
    }
    if (state.speedMs === null) {
      dispatch({ type: SnakeGameOperation.Start });
    } else {
      // Code smell: Marshalling all key events to the reducer here,
      // should guard however they will just fall through
      dispatch({ type: e.key as SnakeDirection });
    }
  }

  const handleReset = () => {
    dispatch({ type: SnakeGameOperation.Reset });
  }

  return (<div style={{ flexGrow: 2, padding: "10px" }}>
    <Section role="note">
      Score: {state.score}. High Score: {state.highScore}
    </Section>
    <GameWrapper
      role="application"
      tabIndex={0}
      onKeyUp={handleGridKeyUp}
      onClick={handleReset}
    >
      {viewType === ViewMode.Html && <BoardHtml
        rows={rows}
        cols={cols}
        cells={cells}
        state={state}
      />}
      {viewType === ViewMode.Ascii && <BoardAscii
        rows={rows}
        cols={cols}
        cells={cells}
        state={state}
      />}
      {viewType === ViewMode.Canvas && <BoardCanvas
        rows={rows}
        cols={cols}
        cells={cells}
        state={state}
      />}

    </GameWrapper>
    <Section>
      Press &apos;t&apos; to toggle view modes in game play (current mode: ${viewType})
    </Section>
  </div >
  )
}

export default SnakeGame