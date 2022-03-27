import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Pinterest = React.lazy(() => import('./Pinterest'))

const PinterestContainer = () => {
  return (
    <ContentWrapper
      title='Pinterest'
      codeLink="/features/pinterest"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Pinterest />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default PinterestContainer