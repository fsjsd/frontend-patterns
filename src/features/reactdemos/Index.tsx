import React from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import ReactMemo from './ReactMemo'

const Index = () => {
  return (
    <ContentWrapper
      title='React Demos'
      codeLink="/features/reactdemos"
    >
      <ReactMemo />
    </ContentWrapper>
  )
}

export default Index