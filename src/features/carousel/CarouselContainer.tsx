import React, { Suspense } from 'react'
import { ContentWrapper } from '../../ux/ContentWrapper'
import Loading from '../../ux/Loading'
import Carousel, { CarouselSlideData } from './Carousel'

const urlRoot = process.env.REACT_APP_ROOT_URL

const CarouselContainer = () => {
  const data: CarouselSlideData[] = [
    {
      bannerText: 'Tour the Empire State Building! Buy tickets now.',
      imgUrl: `${urlRoot}/images/newyork.jpg`,
      imgAlt: 'New York City skyline',
    },
    {
      bannerText: 'Ride the Shinkansen!',
      imgUrl: `${urlRoot}/images/city.jpg`,
      imgAlt: 'Tokyo skyline',
    },
    {
      bannerText: 'See penguins!',
      imgUrl: `${urlRoot}/images/penguin.jpg`,
      imgAlt: 'Penguins',
    },
  ]

  return (
    <ContentWrapper
      title="Carousel"
      codeLink="/features/carousel"
      markDownPromise={import('./requirements.md')}
      noPadding={true}>
      <Suspense fallback={<Loading />}>
        <Carousel data={data} width={'1200'} />
      </Suspense>
    </ContentWrapper>
  )
}

export default CarouselContainer
