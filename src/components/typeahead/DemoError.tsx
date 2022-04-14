import React from 'react'
import FieldSet from '../../ux/designsystem/FieldSet'
import InputText from '../../ux/designsystem/InputText'
import Label from '../../ux/designsystem/Label'
import Legend from '../../ux/designsystem/Legend'
import TypeAhead from './TypeAhead'
import { NoResults, TextResultItem, TypeAheadResultsWrapper, TypeAheadWrapper } from './TypeAheadStyles'



const DemoError = ({ onError }: { onError?: (error: unknown) => void }) => {
  return (
    <FieldSet>
      <Label htmlFor="error">Error demo</Label>
      <TypeAhead
        id="error"
        wrapperComponent={TypeAheadWrapper}
        inputComponent={InputText}
        emptyResultsComponent={NoResults}
        resultsWrapperComponent={TypeAheadResultsWrapper}
        resultComponent={TextResultItem}
        getResults={() => Promise.reject(new Error('Something went wrong'))}
        onSelect={() => {
          // no op
        }}
        onError={(error) => {
          console.error(error);
          onError && onError(error)
        }}
      />
      <Legend>Demos graceful failure of suggestions if getResults fails</Legend>
    </FieldSet>
  )
}

export default DemoError