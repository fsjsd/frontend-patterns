import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const TypeAhead = React.lazy(() => import('./TypeAhead'))

const TypeAheadContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Type-ahead</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <TypeAhead />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default TypeAheadContainer