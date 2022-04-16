import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const Netflix = React.lazy(() => import('./Netflix'))

const NetflixContainer = () => {
  return (
    <ContentContainer
      title="Netflix"
      codeLink="/features/netflix"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Netflix />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default NetflixContainer