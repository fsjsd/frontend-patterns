// single source of truth for routes used in this app, to prevent repeating
// this data in multiple places
import React from 'react'
import {
  MdAssessment,
  MdChat,
  MdDashboard,
  MdFlip,
  MdListAlt,
  MdReceiptLong,
  MdRecentActors,
  MdTableView,
  MdTheaters,
} from 'react-icons/md'
import CarouselContainer from './features/carousel/CarouselContainer'
import InfiniteScrollContainer from './features/infinitescroll/InfiniteScrollContainer'
import NotImplementedException from './features/misc/NotImplementedException'
import Home from './Home'

const urlRoot = process.env.REACT_APP_ROOT_URL

const enum NAV_GROUPS {
  COMPONENTS = 'Components',
  FEATURES = 'Features',
}

// icons: https://react-icons.github.io/react-icons/icons?name=md

const appRoutes = [
  {
    path: `${urlRoot}/carousel`,
    element: <CarouselContainer />,
    icon: <MdRecentActors />,
    title: 'Carousel',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/infinitescroll`,
    element: <InfiniteScrollContainer />,
    icon: <MdReceiptLong />,
    title: 'Infinite Scroll',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/typeahead`,
    element: <NotImplementedException />,
    icon: <MdFlip />,
    title: 'Typeahead',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/newsfeed`,
    element: <NotImplementedException />,
    icon: <MdListAlt />,
    title: 'Newsfeed',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/datatable`,
    element: <NotImplementedException />,
    icon: <MdTableView />,
    title: 'Data table',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/poll`,
    element: <NotImplementedException />,
    icon: <MdAssessment />,
    title: 'Poll',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/messenger`,
    element: <NotImplementedException />,
    icon: <MdChat />,
    title: 'Messenger',
    group: NAV_GROUPS.FEATURES,
  },
  {
    path: `${urlRoot}/netflix`,
    element: <NotImplementedException />,
    icon: <MdTheaters />,
    title: 'Netflix',
    group: NAV_GROUPS.FEATURES,
  },
  {
    path: `${urlRoot}/pinterest`,
    element: <NotImplementedException />,
    icon: <MdDashboard />,
    title: 'Pinterest',
    group: NAV_GROUPS.FEATURES,
  },

  {
    path: `${urlRoot}/`,
    element: <Home />,
  },
]

export default appRoutes
