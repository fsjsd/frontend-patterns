import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const Trading = React.lazy(() => import('./Trading'))

const TradingContainer = () => {
  return (
    <ContentContainer
      title="Trading App"
      codeLink="/features/trading"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Trading />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default TradingContainer