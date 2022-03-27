import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Netflix = React.lazy(() => import('./Netflix'))

const NetflixContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Netflix</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Netflix />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default NetflixContainer