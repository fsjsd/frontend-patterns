import React, { RefObject, useLayoutEffect, useRef, useState } from 'react'
import {
  CarouselWrapper,
  Slide,
  SlideBanner,
  SlideButton,
  SlideContainer,
  SlideIndicator,
  SlideIndicators,
} from './CarouselUI'

export interface CarouselSlideData {
  bannerText: string
  imgUrl: string
  imgAlt: string
}

enum NAV_COMMAND {
  FORWARD = 'forward',
  BACKWARD = 'backward',
  NUMBER = 'number',
}

interface CarouselProps {
  data: CarouselSlideData[]
  width: string
}

const getNewScrollPosition = (
  slideContainerEl: RefObject<HTMLDivElement>,
  slideWidth: number,
  arg: NAV_COMMAND,
  slideIndex = 0,
) => {
  if (!slideContainerEl.current) {
    return 0
  }
  const gap = 10
  const maxScrollLeft = slideContainerEl.current.scrollWidth - slideWidth

  if (arg === NAV_COMMAND.FORWARD) {
    const x = slideContainerEl.current.scrollLeft + slideWidth - gap
    return x <= maxScrollLeft ? x : 0
  } else if (arg === NAV_COMMAND.BACKWARD) {
    const x = slideContainerEl.current.scrollLeft - slideWidth + gap
    return x >= 0 ? x : maxScrollLeft
  } else if (arg === NAV_COMMAND.NUMBER) {
    const x = slideIndex * (slideWidth + gap)
    return x
  }
  return 0
}

const deriveSlideWidth = (slideContainerEl: RefObject<HTMLDivElement>) => {
  if (slideContainerEl.current) {
    const firstSlide = slideContainerEl.current.querySelector(
      "[aria-label='slide']",
    ) as HTMLElement
    return firstSlide?.offsetWidth ?? 0
  }
  return 0
}

const Carousel = ({ data, width }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideWidth, setSlideWidth] = useState(0)
  const slideContainerEl = useRef<HTMLDivElement>(null)
  const imgHeight = '600'

  useLayoutEffect(() => {
    if (!slideContainerEl.current) {
      return
    }

    // run on first render ...
    setSlideWidth(deriveSlideWidth(slideContainerEl))

    const handleWindowResize = () => {
      setSlideWidth(deriveSlideWidth(slideContainerEl))
    }

    // run on resize ...
    window.addEventListener('resize', handleWindowResize)

    // Sync slide indicators
    const slideObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const slideIndex = (entry.target as HTMLElement).dataset.slideindex
            setCurrentSlide(Number(slideIndex))
          }
        })
      },
      { root: slideContainerEl.current, threshold: 0.1 },
    )

    slideContainerEl.current
      .querySelectorAll("[aria-label='slide']")
      .forEach(slide => {
        slideObserver.observe(slide)
      })

    // remove event listener on unmount ...
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [slideContainerEl])

  const handleSlideNavClick = (
    navCommand: NAV_COMMAND,
    slideIndex?: number,
  ) => {
    if (!slideContainerEl.current) return
    const scrollLeft = getNewScrollPosition(
      slideContainerEl,
      slideWidth,
      navCommand,
      slideIndex,
    )
    slideContainerEl.current.scrollLeft = scrollLeft
  }

  return (
    <CarouselWrapper width={width}>
      <SlideContainer ref={slideContainerEl} data-testid="slidecontainer">
        {data.map((slideData, i) => (
          <Slide key={i} data-slideindex={i} role="tabpanel" aria-label="slide">
            <SlideBanner>{slideData.bannerText}</SlideBanner>
            <img
              src={slideData.imgUrl}
              alt={slideData.imgAlt}
              width={width}
              height={imgHeight}
            />
          </Slide>
        ))}
      </SlideContainer>
      <SlideButton
        role={'button'}
        aria-label="back"
        isForward={false}
        onClick={() => handleSlideNavClick(NAV_COMMAND.BACKWARD)}
      >
        ←
      </SlideButton>
      <SlideButton
        role={'button'}
        aria-label="forward"
        isForward={true}
        onClick={() => handleSlideNavClick(NAV_COMMAND.FORWARD)}
      >
        →
      </SlideButton>
      <SlideIndicators>
        {data.map((_, i) => (
          <SlideIndicator
            key={i}
            active={i === currentSlide}
            role={'tab'}
            aria-label={`slide ${i + 1}`}
            aria-selected={i === currentSlide}
            onClick={() => handleSlideNavClick(NAV_COMMAND.NUMBER, i)}
          />
        ))}
      </SlideIndicators>
    </CarouselWrapper>
  )
}

export default Carousel
