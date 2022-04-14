import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import FieldSet from '../../ux/designsystem/FieldSet'
import InputText from '../../ux/designsystem/InputText'
import Label from '../../ux/designsystem/Label'
import Legend from '../../ux/designsystem/Legend'
import Loading from '../../ux/Loading'
import DemoError from './DemoError'
import DemoUniversitySearch from './DemoUniversitySearch'

/**
 * Container for the Typeahead component
 * @returns JSX
 */
const TypeAheadContainer = () => {

  return (
    <ContentContainer
      title='Type-ahead'
      codeLink="/features/typeahead"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <DemoUniversitySearch />
          <DemoError />
          <FieldSet>
            <Label htmlFor="error">Normal text box</Label>
            <InputText placeholder='Press tab' />
            <Legend>Just on screen to test tab key press</Legend>
          </FieldSet>
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default TypeAheadContainer