import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
import InfiniteScroll from './InfiniteScroll';
import { FeedItem, getItem } from './utils/data';
import { db } from "./utils/db";

// import RecyclingVirtualList from './recyclingvirtuallist/RecyclingVirtualList'
const RecyclingVirtualList = React.lazy(() => import('./recyclingvirtuallist/RecyclingVirtualList'))
//const InfiniteScroll = React.lazy(() => import('./InfiniteScroll'))

const DB = db(1000, 1000, getItem);

const InfiniteScrollContainer = () => {

  return (
    <ContentContainer
      title="Infinite Scroll"
      codeLink="/features/infinitescroll"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main" style={{ width: 300, height: 500, border: "solid 1px red", overflowY: "scroll" }}>

          <InfiniteScroll />

          {false && <RecyclingVirtualList
            pageSize={10}
            load={(start, limit) => DB.load(start, limit).then((cursor) => cursor.chunk) as Promise<FeedItem[]>}
            itemFullComponent={(item: FeedItem) => <div>{item.name}</div>}
          />}

        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default InfiniteScrollContainer
