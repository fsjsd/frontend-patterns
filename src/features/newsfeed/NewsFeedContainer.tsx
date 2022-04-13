import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const NewsFeed = React.lazy(() => import('./NewsFeed'))

const NewsFeedContainer = () => {
  return (
    <ContentContainer
      title='News feed'
      codeLink="/features/newsfeed"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <NewsFeed />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default NewsFeedContainer