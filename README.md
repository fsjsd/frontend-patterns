# @fsjsd/frontend-patterns

[![codecov](https://codecov.io/gh/fsjsd/frontend-patterns/branch/main/graph/badge.svg?token=80RFETMF8Z)](https://codecov.io/gh/fsjsd/frontend-patterns)
![build](https://github.com/fsjsd/frontend-patterns/actions/workflows/coverage.yaml/badge.svg)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fsjsd/frontend-patterns.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fsjsd/frontend-patterns/context:javascript)

![Front-end patterns](https://raw.githubusercontent.com/fsjsd/frontend-patterns/main/.docs/readme-header-fepatterns.jpg)

Repo of modern front end design patterns, implemented in React. See the list below

# Tech

* Create React App w/ TypeScript
* Comprehensive Unit Test coverage via Jest
* CI pipeline through GitHub Actions to automate tests/coverage thresholds
  * GitHub Pages deployment on master merge
* local husky/lint-staged to enforce lint / test coverage standards

# Setup

- clone repo and `yarn`
- `yarn start` to launch (Create React-App implementation)
- View [online here](https://fsjsd.github.io/frontend-patterns/)

# Patterns

## Components

### [Carousel](src/features/carousel/)

React implementation of web.dev's performant [Carousel demo](https://web.dev/patterns/web-vitals-patterns/)

![carousel](https://user-images.githubusercontent.com/30638950/162620275-5eb59fca-fed7-455b-8e83-6f8de411ccdf.gif)


# Features

### [Snake Pattern](src/features/snakegame/)

React based Snake game with three different view implementations (HTML, Canvas and raw text)

![snake](https://user-images.githubusercontent.com/30638950/162620411-7b697099-0088-468f-a5b5-9f68d756f187.gif)


# References

Refer to [this gist](https://gist.github.com/fsjsd/149bdb13fb644849a519ad779a1e0e60) for a list of articles 
and resources

# Tips

lint-staged deleting your work? Run this to recover the stash it creates:

`gitk --all $( git fsck --no-reflog | awk '/dangling commit/ {print $3}' )`


