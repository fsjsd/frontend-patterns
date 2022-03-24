import React from 'react'
import styled from 'styled-components'

const LoadingAnim = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    border: 4px solid #BBB;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const Loading = () => {
  return (
    <LoadingAnim><div></div><div></div></LoadingAnim>
  )
}

export default Loading