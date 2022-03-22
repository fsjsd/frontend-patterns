import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import CarouselContainer from './features/carousel/CarouselContainer';
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import InfiniteScrollContainer from './features/infinitescroll/InfiniteScrollContainer';

//https://github.com/fsjsd/frontend-patterns

function App() {
  return (
    <BrowserRouter>
      <DemoSiteLayoutContainer
        renderHeader={
          () => (<>
            <b>
              Front-End
            </b>
            {" "}
            Design Patterns
          </>)
        }
        renderNavigation={
          () => (<div> {/* Filter control for nav */}
            <LeftNavigation />
          </div>)
        }
        renderContents={
          () => (<Routes>
            <Route path="/infinitescroll" element={<InfiniteScrollContainer />} />
            <Route path="/carousel" element={<CarouselContainer />} />
            <Route path="/" element={<Home />} />
          </Routes>)
        } />
    </BrowserRouter>
  );
}

export default App;
