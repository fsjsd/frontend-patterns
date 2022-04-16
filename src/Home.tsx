import React from 'react'
import { ContentContainer } from './ux/ContentContainer'

const Home = () => {
  return (
    <ContentContainer
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
    </ContentContainer>
  )
}

export default Home