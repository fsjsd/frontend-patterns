import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
const ToDo = React.lazy(() => import('./ToDo'))

const ToDoContainer = () => {
  return (
    <ContentWrapper
      title='To Do'
      codeLink="/features/todo"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <ToDo />
        </div>
      </Suspense>
    </ContentWrapper>
  )
}

export default ToDoContainer