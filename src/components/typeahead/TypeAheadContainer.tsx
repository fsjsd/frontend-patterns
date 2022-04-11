import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const TypeAhead = React.lazy(() => import('./TypeAhead'))

const TypeAheadContainer = () => {
  return (
    <ContentWrapper
      title='Type-ahead'
      codeLink="/features/typeahead"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <TypeAhead />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default TypeAheadContainer