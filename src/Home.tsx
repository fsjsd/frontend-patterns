import React from 'react'
import { ContentWrapper } from './ux/ContentWrapper'

const Home = () => {
  return (
    <ContentWrapper
      title='Home'
    >
      <div role="main">
        <p>
          Browse samples in the navigation.
        </p>
        <p>
          Each sample has links to code and design notes
        </p>
      </div>
    </ContentWrapper>
  )
}

export default Home