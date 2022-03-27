import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const Poll = React.lazy(() => import('./Poll'))

const PollContainer = () => {
  return (<>
    <ContentWrapper
      title="Poll"
      codeLink="/features/poll"
      markDownPromise={import('./requirements.md')}
    >
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