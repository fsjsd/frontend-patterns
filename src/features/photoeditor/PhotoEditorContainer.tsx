import React, { Suspense } from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import Loading from '../../ux/Loading'
const PhotoEditor = React.lazy(() => import('./PhotoEditor'))

const PhotoEditorContainer = () => {
  return (
    <ContentContainer
      title='Photo Editor'
      codeLink="/features/photoeditor"
      markDownPromise={import('./requirements.md')}
      noPadding={true}
    >
      <Suspense fallback={<Loading />}>
        <div role="main">
          <PhotoEditor />
        </div>
      </Suspense>
    </ContentContainer>
  )
}

export default PhotoEditorContainer