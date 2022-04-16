# @fsjsd/frontend-patterns

[![codecov](https://codecov.io/gh/fsjsd/frontend-patterns/branch/main/graph/badge.svg?token=80RFETMF8Z)](https://codecov.io/gh/fsjsd/frontend-patterns)
![build](https://github.com/fsjsd/frontend-patterns/actions/workflows/coverage.yaml/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fsjsd/frontend-patterns.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fsjsd/frontend-patterns/context:javascript)

![Front-end patterns](https://raw.githubusercontent.com/fsjsd/frontend-patterns/main/.docs/readme-header-fepatterns.jpg)

Enterprise-grade repo of modern front end design patterns, implemented in React. See the feature list below

# Tech

* 🌐 ***Create React App*** w/ ***TypeScript*** throughout
  * 💄 Custom CSS via styled-components throughout
  * 📱 Mobile Optimised / responsive
  * 👂 Accessible, Semantic HTML
* 🚀 ***High Performance*** React
  * ✨ ***60fps*** on most demos, on mobile. 
  * 🔥 Near 100% ***Lighthouse*** rating
  * ✔️ ***Web vitals*** reported on screen
* 💪 ***>95%*** Unit Test coverage via ***Jest***
  * 👩‍🦯 ***a11y*** test automation via ***jest-axe***
* 🏭 CI pipeline (GitHub Actions)
  * 💂 High coverage thresholds
  * 🔒 Automated ***Synk, CodeQL*** & ***LGTM*** checks
  * ❤️ E2E tests via ***Cypress*** (basic)
  * 🌎 ***Lighthouse*** testing
  * 📄 ***GitHub Pages*** deployment on master merge
* ✋ local ***husky/lint-staged*** to enforce lint / test coverage standards

# Setup

- clone repo and `yarn`
- `yarn start` to launch (Create React-App implementation)
- View [online here](https://fsjsd.github.io/frontend-patterns/)

# Patterns

## Components

### [Typeahead](src/features/typeahead/)

Fully styleable, accessible Typeahead component pattern (bring your own UI components).

![typeahead](https://user-images.githubusercontent.com/30638950/163543928-f9e40895-495a-446a-a791-4de5b92350bf.gif)

### [Dynamic Image](src/features/dynamicimage/)

Drop-in replacement for native HTML image component. Does not load image until visible in viewport, provides props to display custom loading component while image downloading, and error component if image load fails

![dynamicimage2](https://user-images.githubusercontent.com/30638950/163666382-82eee954-c14d-4b51-9ded-767d20cbb8b4.gif)

### [Carousel](src/features/carousel/)

React implementation of web.dev's performant [Carousel demo](https://web.dev/patterns/web-vitals-patterns/)

![carousel](https://user-images.githubusercontent.com/30638950/162620275-5eb59fca-fed7-455b-8e83-6f8de411ccdf.gif)

# Features

### [Snake Game](src/features/snakegame/)

React based Snake game with three different view implementations (HTML, Canvas and raw text)

![snake](https://user-images.githubusercontent.com/30638950/162620411-7b697099-0088-468f-a5b5-9f68d756f187.gif)

# References

Refer to [this gist](https://gist.github.com/fsjsd/149bdb13fb644849a519ad779a1e0e60) for a list of articles 
and resources

