import React from 'react'
import Carousel, { CarouselSlideData } from './Carousel'

const CarouselContainer = () => {

  const data: CarouselSlideData[] = [
    {
      bannerText: 'Tour the Empire State Building! Buy tickets now.',
      imgUrl: './frontend-patterns/images/newyork.jpg',
      imgAlt: 'New York City skyline',
    },
    {
      bannerText: 'Ride the Shinkansen!',
      imgUrl: './frontend-patterns/images/city.jpg',
      imgAlt: 'Tokyo skyline',
    },
    {
      bannerText: 'See penguins!',
      imgUrl: './frontend-patterns/images/penguin.jpg',
      imgAlt: 'Penguins',
    }
  ];

  return (
    <div>
      <Carousel data={data} width={"1200"} />
    </div>
  )
}

export default CarouselContainer