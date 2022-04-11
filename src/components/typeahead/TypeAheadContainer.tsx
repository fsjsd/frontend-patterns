import React, { Suspense, useCallback } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import { TypeAheadInput, TypeAheadResultItem, TypeAheadWrapper } from './TypeAheadStyles'
const TypeAhead = React.lazy(() => import('./TypeAhead'))

const TypeAheadContainer = () => {

  const handleGetResults = useCallback((query: string) => {
    return new Promise<string[]>((resolve) => {
      console.log(query)
      setTimeout(() => {
        resolve(['result1', 'result2', 'result3'])
      }, 100)
    })
  }, []);

  return (
    <ContentWrapper
      title='Type-ahead'
      codeLink="/features/typeahead"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <TypeAhead
            wrapperComponent={TypeAheadWrapper}
            inputComponent={TypeAheadInput}
            getResults={(query) => handleGetResults(query) as Promise<string[]>}
            renderResult={(result, i, handleClick) => <TypeAheadResultItem onClick={() => handleClick(result)}>{result as string}</TypeAheadResultItem>}
          />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default TypeAheadContainer