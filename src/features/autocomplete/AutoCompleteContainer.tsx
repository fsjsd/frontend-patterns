import React, { Suspense } from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import AutoComplete from './AutoComplete'

// UX design guidelines:
// https://baymard.com/blog/autocomplete-design

const AutoCompleteContainer = () => {
  return (
    <>
      <ContentHeader>
        <ContentHeaderLabel>Auto-complete</ContentHeaderLabel>
      </ContentHeader>
      <ContentWrapper>
        <Suspense fallback={<Loading />}>
          <div role="main">
            <AutoComplete />
          </div>
        </Suspense>
      </ContentWrapper>
    </>
  )
}

export default AutoCompleteContainer
