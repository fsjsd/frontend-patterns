import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import { ViewMode } from './types'
const SnakeGame = React.lazy(() => import('./SnakeGame'))

const SnakeGameContainer = () => {
  return (<>
    <ContentWrapper
      title='SnakeGame'
      codeLink="/features/snakegame"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <SnakeGame viewMode={ViewMode.Canvas} />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default SnakeGameContainer