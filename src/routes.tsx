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
import { GiSandSnake } from "react-icons/gi";
import { FaReact } from "react-icons/fa";

import CarouselContainer from './components/carousel/CarouselContainer'
import DataTableContainer from './components/datatable/DataTableContainer'
import InfiniteScrollContainer from './features/infinitescroll/InfiniteScrollContainer'
import MessengerContainer from './features/messenger/MessengerContainer'
import NetflixContainer from './features/netflix/NetflixContainer'
import NewsFeedContainer from './features/newsfeed/NewsFeedContainer'
import PinterestContainer from './features/pinterest/PinterestContainer'
import PollContainer from './components/poll/PollContainer'
import TypeAheadContainer from './components/typeahead/TypeAheadContainer'
import ToDoContainer from './features/todo/ToDoContainer'
import Home from './Home'
import ReactDemoContainer from './features/reactdemos/ReactDemoContainer'
import SnakeGameContainer from './features/snakegame/SnakeGameContainer'

const urlRoot = process.env.REACT_APP_ROOT_URL

const enum NAV_GROUPS {
  COMPONENTS = 'Components',
  FEATURES = 'Features',
}

interface AppRouteInfo {
  path: string;
  element: JSX.Element;
  icon?: JSX.Element;
  title?: string;
  group?: NAV_GROUPS;
  isWip: boolean;
}

// icons: https://react-icons.github.io/react-icons/icons?name=md

const appRoutes: AppRouteInfo[] = [
  {
    path: `${urlRoot}/carousel`,
    element: <CarouselContainer />,
    icon: <MdRecentActors />,
    title: 'Carousel',
    group: NAV_GROUPS.COMPONENTS,
    isWip: false,
  },
  {
    path: `${urlRoot}/infinitescroll`,
    element: <InfiniteScrollContainer />,
    icon: <MdReceiptLong />,
    title: 'Infinite Scroll',
    group: NAV_GROUPS.COMPONENTS,
    isWip: true,
  },
  {
    path: `${urlRoot}/typeahead`,
    element: <TypeAheadContainer />,
    icon: <MdFlip />,
    title: 'Typeahead',
    group: NAV_GROUPS.COMPONENTS,
    isWip: false,
  },
  {
    path: `${urlRoot}/newsfeed`,
    element: <NewsFeedContainer />,
    icon: <MdListAlt />,
    title: 'Newsfeed',
    group: NAV_GROUPS.COMPONENTS,
    isWip: true,
  },
  {
    path: `${urlRoot}/datatable`,
    element: <DataTableContainer />,
    icon: <MdTableView />,
    title: 'Data table',
    group: NAV_GROUPS.COMPONENTS,
    isWip: true,
  },
  {
    path: `${urlRoot}/poll`,
    element: <PollContainer />,
    icon: <MdAssessment />,
    title: 'Poll',
    group: NAV_GROUPS.COMPONENTS,
    isWip: true,
  },
  {
    path: `${urlRoot}/snakegame`,
    element: <SnakeGameContainer />,
    icon: <GiSandSnake />,
    title: 'Snake game',
    group: NAV_GROUPS.FEATURES,
    isWip: false,
  },
  {
    path: `${urlRoot}/reactdemos`,
    element: <ReactDemoContainer />,
    icon: <FaReact />,
    title: 'React demos',
    group: NAV_GROUPS.FEATURES,
    isWip: false,
  },
  {
    path: `${urlRoot}/messenger`,
    element: <MessengerContainer />,
    icon: <MdChat />,
    title: 'Messenger',
    group: NAV_GROUPS.FEATURES,
    isWip: true,
  },
  {
    path: `${urlRoot}/netflix`,
    element: <NetflixContainer />,
    icon: <MdTheaters />,
    title: 'Netflix',
    group: NAV_GROUPS.FEATURES,
    isWip: true,
  },
  {
    path: `${urlRoot}/pinterest`,
    element: <PinterestContainer />,
    icon: <MdDashboard />,
    title: 'Pinterest',
    group: NAV_GROUPS.FEATURES,
    isWip: true,
  },
  {
    path: `${urlRoot}/todo`,
    element: <ToDoContainer />,
    icon: <MdTask />,
    title: 'To-do',
    group: NAV_GROUPS.FEATURES,
    isWip: true,
  },
  {
    path: `${urlRoot}/`,
    element: <Home />,
    isWip: false,
  },
  {
    path: `/`,
    element: <Home />,
    isWip: false,
  },
]

export default appRoutes
