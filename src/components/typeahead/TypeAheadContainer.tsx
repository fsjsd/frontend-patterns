import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import FieldSet from '../../ux/designsystem/FieldSet'
import InputText from '../../ux/designsystem/InputText'
import Label from '../../ux/designsystem/Label'
import Loading from '../../ux/Loading'
import DemoError from './DemoError'
import DemoUniversitySearch from './DemoUniversitySearch'

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
          <DemoUniversitySearch />
          <DemoError />
          <FieldSet>
            <Label htmlFor="error">Tab demo</Label>
            <InputText placeholder='Press tab' />
          </FieldSet>
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default TypeAheadContainer