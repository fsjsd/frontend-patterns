/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useEffectAsync } from '../../../utils/hooks/useEffectAsync'

const Sentinel = styled.div`
  visibility:hidden;
`

// https://codesandbox.io/s/typescript-virtual-scroll-implementation-vrkb4?from-embed
interface RecyclingVirtualList<T> {
  pageSize: number
  load: (start: number, limit: number) => Promise<T[]>
  itemFullComponent: (item: T) => React.ReactNode
  itemLightComponent?: (item: T) => React.ReactNode
  itemPlaceholderComponent?: (item: T) => React.ReactNode
}

const RecyclingVirtualList = <T,>({
  pageSize,
  load,
  itemFullComponent,
  itemLightComponent,
  itemPlaceholderComponent
}: RecyclingVirtualList<T>) => {

  const listContainer = useRef<HTMLDivElement>(null);
  const sentinelTop = useRef<HTMLDivElement>(null);
  const sentinelBottom = useRef<HTMLDivElement>(null);

  const elementsLimit = pageSize * 2;
  const [elementsPool, setElementsPool] = React.useState<HTMLElement[]>([]);
  const [state, setState] = useState({
    start: 0,
    end: 0
  })

  // temp routine to force load without intersection observers
  useEffectAsync(async () => {
    if (!listContainer.current || !sentinelTop.current || !sentinelBottom.current) return;

    const count = state.end - state.start;
    const data = await load(state.end, pageSize);

    let newStart = state.start;
    let newEnd = state.end;

    if (count < elementsLimit) {
      newEnd += pageSize;
      // TODO: #initElementsPool(data);
    } else if (count === elementsLimit && elementsPool.length > 0) {
      // Update start and end position
      newStart += pageSize;
      newEnd += pageSize;
      // Trigger recycling
      // TODO: #recycle(ScrollDirection.DOWN, data);

      // Get the current first element Y Position
      const firstElementTranslateY = Number(elementsPool[0].dataset.translateY);
      // Calculate how much space we need to adjust
      const diff =
        firstElementTranslateY -
        +listContainer.current.style.paddingTop.replace("px", "");
      // Padding top always equals to Y position of first rendered element
      listContainer.current.style.paddingTop = `${firstElementTranslateY}px`;
      // The diff between old and new first element position is the value
      // that we need to substract from the bottom spacer
      listContainer.current.style.paddingBottom = `${Math.max(
        0,
        +listContainer.current.style.paddingBottom.replace("px", "") - diff
      )}px`;
      sentinelTop.current.style.transform = `translateY(${firstElementTranslateY}px)`;
    }
    sentinelBottom.current.style.transform = `translateY(${elementsPool[elementsPool.length - 1].dataset.translateY
      }px)`;
  }, [])

  // {elementsPool.map((element, index) => {})}
  return (
    <div ref={listContainer}>
      <Sentinel ref={sentinelTop} aria-hidden="true" ></Sentinel>


      <Sentinel ref={sentinelBottom} aria-hidden="true" ></Sentinel>
    </div>
  )
}

export default RecyclingVirtualList