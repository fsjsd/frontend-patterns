import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Poll = React.lazy(() => import('./Poll'))

const PollContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Poll</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Poll />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default PollContainer