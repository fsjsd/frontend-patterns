import React from 'react'
import { ContentContainer } from '../../ux/ContentContainer'
import ReactMemo from './ReactMemo'

const ReactDemoContainer = () => {
  return (
    <ContentContainer
      title='React Demos'
      codeLink="/features/reactdemos"
    >
      <ReactMemo />
    </ContentContainer>
  )
}

export default ReactDemoContainer