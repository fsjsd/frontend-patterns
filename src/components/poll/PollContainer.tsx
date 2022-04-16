import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const Poll = React.lazy(() => import('./Poll'))

const PollContainer = () => {
  return (<>
    <ContentContainer
      title="Poll"
      codeLink="/features/poll"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <Poll />
        </div>
      </Suspense>
    </ContentContainer>
  </>
  )
}

export default PollContainer