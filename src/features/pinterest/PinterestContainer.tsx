import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Pinterest = React.lazy(() => import('./Pinterest'))

const PinterestContainer = () => {
  return (<>
    <ContentHeader>
      <ContentHeaderLabel>Pinterest</ContentHeaderLabel>
    </ContentHeader>
    <ContentWrapper>
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Pinterest />
        </div>
      </Suspense>
    </ContentWrapper>
  </>
  )
}

export default PinterestContainer