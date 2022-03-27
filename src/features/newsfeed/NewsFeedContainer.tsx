import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const NewsFeed = React.lazy(() => import('./NewsFeed'))

const NewsFeedContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>News feed</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <NewsFeed />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default NewsFeedContainer