import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const Pinterest = React.lazy(() => import('./Pinterest'))

const PinterestContainer = () => {
  return (
    <ContentContainer
      title='Pinterest'
      codeLink="/features/pinterest"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Pinterest />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default PinterestContainer