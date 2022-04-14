import React from 'react'
import styled from 'styled-components'

const LoadingAnim = styled.div<{ size: number }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  div {
    position: absolute;
    border: 4px solid #BBB;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  @keyframes lds-ripple {
    0% {
      top: ${({ size }) => size / 2}px;
      left: ${({ size }) => size / 2}px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: ${({ size }) => size}px;
      height: ${({ size }) => size}px;
      opacity: 0;
    }
  }
`;

const Loading = ({ size }: { size?: number }) => {
  return (
    <LoadingAnim size={size ?? 80}><div></div><div></div></LoadingAnim>
  )
}

export const ScreenTransition = styled.div`
  width: 100%;
  height: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`

export const ScreenTransitionLoading = () => <ScreenTransition><Loading size={160} /></ScreenTransition>

export default Loading