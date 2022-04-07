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
  MdTask
} from 'react-icons/md'
import CarouselContainer from './features/carousel/CarouselContainer'
import DataTableContainer from './features/datatable/DataTableContainer'
import InfiniteScrollContainer from './features/infinitescroll/InfiniteScrollContainer'
import MessengerContainer from './features/messenger/MessengerContainer'
import NetflixContainer from './features/netflix/NetflixContainer'
import NewsFeedContainer from './features/newsfeed/NewsFeedContainer'
import PinterestContainer from './features/pinterest/PinterestContainer'
import PollContainer from './features/poll/PollContainer'
import TypeAheadContainer from './features/typeahead/TypeAheadContainer'
import ToDoContainer from './features/todo/ToDoContainer'
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
    element: <TypeAheadContainer />,
    icon: <MdFlip />,
    title: 'Typeahead',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/newsfeed`,
    element: <NewsFeedContainer />,
    icon: <MdListAlt />,
    title: 'Newsfeed',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/datatable`,
    element: <DataTableContainer />,
    icon: <MdTableView />,
    title: 'Data table',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/poll`,
    element: <PollContainer />,
    icon: <MdAssessment />,
    title: 'Poll',
    group: NAV_GROUPS.COMPONENTS,
  },
  {
    path: `${urlRoot}/messenger`,
    element: <MessengerContainer />,
    icon: <MdChat />,
    title: 'Messenger',
    group: NAV_GROUPS.FEATURES,
  },
  {
    path: `${urlRoot}/netflix`,
    element: <NetflixContainer />,
    icon: <MdTheaters />,
    title: 'Netflix',
    group: NAV_GROUPS.FEATURES,
  },
  {
    path: `${urlRoot}/pinterest`,
    element: <PinterestContainer />,
    icon: <MdDashboard />,
    title: 'Pinterest',
    group: NAV_GROUPS.FEATURES,
  },
  {
    path: `${urlRoot}/todo`,
    element: <ToDoContainer />,
    icon: <MdTask />,
    title: 'To-do',
    group: NAV_GROUPS.FEATURES,
  },

  {
    path: `${urlRoot}/`,
    element: <Home />,
  },
  {
    path: `/`,
    element: <Home />,
  },
]

export default appRoutes
