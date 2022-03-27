import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Messenger = React.lazy(() => import('./Messenger'))

const MessengerContainer = () => {
  return (<>
    <ContentWrapper
      title='Messenger'
      codeLink="/features/messenger"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Messenger />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default MessengerContainer