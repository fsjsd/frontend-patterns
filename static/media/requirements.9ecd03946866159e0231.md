# Carousel requirements

1:1 React conversion / implementation of web.dev's Carousel code.

See the ./_source folder for the original code

## Implementation notes

- `IntersectionObserver` watches Slide components and updates current slide index in local state
  which is relied upon by UI controls to move slides.

- CarouselWrapper
  - flex column with `margin: 0 auto;` centering
- SlideContainer
  - `scroll-snap-type: x mandatory` forces x axis scrolling to snap points
- Slide
  - sets `scroll-snap-align: center;` to support SlideContainer