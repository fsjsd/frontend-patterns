import React, { useEffect, useReducer, useRef } from 'react'

// adapted from : https://github.com/tibotiber/react-fps-stats/blob/development/src/index.js

const BrowserStats = () => {
  const graphWidth = 70;
  /*top = 0,
    right = 'auto',
    bottom = 'auto',
    left = 0,
    graphHeight = 29,
    1;*/

  const [state, dispatch] = useReducer(
    state => {
      const currentTime = Date.now()
      if (currentTime > state.prevTime + 1000) {
        const nextFPS = Math.round(
          (state.frames * 1000) / (currentTime - state.prevTime)
        )
        return {
          max: Math.max(state.max, nextFPS),
          len: Math.min(state.len + 1, graphWidth),
          fps: [...state.fps, nextFPS].slice(-graphWidth),
          frames: 1,
          prevTime: currentTime
        }
      } else {
        return { ...state, frames: state.frames + 1 }
      }
    },
    {
      len: 0,
      max: 0,
      frames: 0,
      prevTime: Date.now(),
      fps: []
    }
  )

  const requestRef = useRef<number>()
  const tick = () => {
    dispatch()
    requestRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(tick)
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current)
    }
  }, []);

  const { fps, len } = state //max, 
  const currentFps = fps[len - 1];

  return (
    <div>
      {currentFps && <b style={{ color: fpsRating(currentFps) }}>{currentFps}fps</b>}
    </div>
  )
}

export default BrowserStats

function fpsRating(currentFps: number): import("csstype").Property.Color {
  if (currentFps == 60) {
    return "#2daf2d";
  }
  if (currentFps > 50) {
    return "#a86323";
  }
  return "#972020";
}
