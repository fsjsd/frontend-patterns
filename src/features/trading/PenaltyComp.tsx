import React from 'react'

declare global {
  interface Window {
    PENALTY: number
  }
}

// adjust the example by editing these values
window.PENALTY = 150_000

/**
 * As this is a contrived example, I've added this to simulate components that
 * do a lot of extra work while rendering. Update the penalty variable at the
 * top to adjust how much of problem this "extra work" causes.
 */
let currentPenaltyValue = 2
function PenaltyComp() {
  for (let index = 2; index < window.PENALTY; index++) {
    currentPenaltyValue = currentPenaltyValue ** index / Math.random()
  }
  return null
}

export default PenaltyComp;