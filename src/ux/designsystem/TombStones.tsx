
import React from 'react'
import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    background-position-x: -200%;
  }`;

const TombStone = styled.div`
  margin-bottom:1rem;
  width:100%;
  height:1rem;
  display:block;
  border-radius:2px;

  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #e8e8e8 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.25s ${shine} linear infinite;

`;
/*
  background: linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.15), rgba(0,0,0,0));
  transform: translateX(-100%);
  animation: ${loadingKeyframes} 1.5s infinite;
*/
export const TombStoneContent = () => {
  return (
    <>
      <TombStone style={{ height: "2rem", width: "45%" }}></TombStone>
      <TombStone></TombStone>
      <TombStone></TombStone>
      <TombStone></TombStone>
    </>
  )
}

