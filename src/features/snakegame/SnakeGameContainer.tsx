import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
import { ViewMode } from './types'
const SnakeGame = React.lazy(() => import('./SnakeGame'))

const SnakeGameContainer = () => {
  return (<>
    <ContentContainer
      title='Snake Game'
      codeLink="/features/snakegame"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <SnakeGame viewMode={ViewMode.Canvas} />
        </div>
      </Suspense>
    </ContentContainer>
  </>
  )
}

export default SnakeGameContainer