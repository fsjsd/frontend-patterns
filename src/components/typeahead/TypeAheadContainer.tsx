import React, { Suspense, useCallback } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import { TypeAheadInput, TypeAheadWrapper } from './TypeAheadStyles'
const TypeAhead = React.lazy(() => import('./TypeAhead'))

const TypeAheadContainer = () => {

  const handleGetResults = useCallback((query: string) => {
    return new Promise<string[]>((resolve) => {
      console.log(query)
      setTimeout(() => {
        resolve(['result1', 'result2', 'result3'])
      }, 1000)
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
            getResults={handleGetResults}
            renderResult={(result) => <div>{result}</div>}
          />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default TypeAheadContainer