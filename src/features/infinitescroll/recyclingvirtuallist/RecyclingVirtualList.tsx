/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

interface RecyclingVirtualList<T> {
  itemFullComponent: (item: T) => React.ReactNode
  itemLightComponent: (item: T) => React.ReactNode
  itemPlaceholderComponent: (item: T) => React.ReactNode
}

const RecyclingVirtualList = <T,>({
  itemFullComponent,
  itemLightComponent,
  itemPlaceholderComponent
}: RecyclingVirtualList<T>) => {
  return (
    <div>

    </div>
  )
}

export default RecyclingVirtualList