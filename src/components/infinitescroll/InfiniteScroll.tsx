import React from 'react'
import styled from 'styled-components';

const TestItem = styled.div`
    border:solid 1px blue;
    height:100px;
`;

// ref code:
// https://codesandbox.io/s/typescript-virtual-scroll-implementation-vrkb4?from-embed

// Parent el is width/height constrained with overflow: scroll
const InfiniteScroll = () => {

  const items = new Array(20).fill(0);

  // TODO: work out based on what can fit in viewport + overscan
  const renderedItemCount = 10;

  return (
    <>
      {items.map((_, i) => <TestItem key={i}>{i}</TestItem>)}
    </>
  )
}

export default InfiniteScroll