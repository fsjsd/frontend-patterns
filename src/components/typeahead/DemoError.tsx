import React from 'react'
import FieldSet from '../../ux/designsystem/FieldSet'
import InputText from '../../ux/designsystem/InputText'
import Label from '../../ux/designsystem/Label'
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
        getResultText={(datum) => datum as string}
        onSelect={() => {
          // no op
        }}
        onError={(error) => {
          console.error(error);
          onError && onError(error)
        }}
      />
    </FieldSet>
  )
}

export default DemoError