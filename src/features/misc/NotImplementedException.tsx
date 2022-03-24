import React from 'react'
import ContentHeader, { ContentHeaderLabel } from '../../ux/ContentHeader'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'

const NotImplementedException = () => {
  return (
    <>
      <ContentHeader>
        <ContentHeaderLabel>throw new NotImplementedException()</ContentHeaderLabel>
      </ContentHeader>
      <ContentWrapper>
        <p>Coming Soon!</p>
        <Loading />
      </ContentWrapper>
    </>
  )
}

export default NotImplementedException