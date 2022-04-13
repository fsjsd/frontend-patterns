import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const Messenger = React.lazy(() => import('./Messenger'))

const MessengerContainer = () => {
  return (<>
    <ContentContainer
      title='Messenger'
      codeLink="/features/messenger"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Messenger />
        </div>
      </Suspense>
    </ContentContainer>
  </>
  )
}

export default MessengerContainer