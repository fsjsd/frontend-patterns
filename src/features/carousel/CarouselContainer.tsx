import React from 'react'
import Carousel, { CarouselSlideData } from './Carousel'

const CarouselContainer = () => {

  const data: CarouselSlideData[] = [
    {
      bannerText: 'Tour the Empire State Building! Buy tickets now.',
      imgUrl: './newyork.jpg',
      imgAlt: 'New York City skyline',
    },
    {
      bannerText: 'Ride the Shinkansen!',
      imgUrl: './tokyo.jpg',
      imgAlt: 'Tokyo skyline',
    },
    {
      bannerText: 'See penguins!',
      imgUrl: './beach.jpg',
      imgAlt: 'Beach',
    }
  ];

  return (
    <div>
      <Carousel data={data} width={"1200"} />
    </div>
  )
}

export default CarouselContainer