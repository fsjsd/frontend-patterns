import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Netflix = React.lazy(() => import('./Netflix'))

const NetflixContainer = () => {
  return (
    <ContentWrapper
      title="Netflix"
      codeLink="/features/netflix"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Netflix />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default NetflixContainer