import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import UniversitySearchDemo from './UniversitySearchDemo'

/**
 * Container for the Typeahead component
 * @returns JSX
 */
const TypeAheadContainer = () => {

  return (
    <ContentWrapper
      title='Type-ahead'
      codeLink="/features/typeahead"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <UniversitySearchDemo />
          <p>
            Content under typeahead
          </p>
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default TypeAheadContainer