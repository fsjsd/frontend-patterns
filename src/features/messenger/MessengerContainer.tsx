import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Messenger = React.lazy(() => import('./Messenger'))

const MessengerContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Messenger</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
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