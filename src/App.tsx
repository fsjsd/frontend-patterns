import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import CarouselContainer from './features/carousel/CarouselContainer';
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter } from 'react-router-dom';

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
          () => (<>
            <CarouselContainer />
          </>)
        } />
    </BrowserRouter>
  );
}

export default App;
