import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const ToDo = React.lazy(() => import('./ToDo'))

const ToDoContainer = () => {
  return (
    <ContentContainer
      title='To Do'
      codeLink="/features/todo"
      markDownPromise={import('./requirements.md')}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <ToDo />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default ToDoContainer