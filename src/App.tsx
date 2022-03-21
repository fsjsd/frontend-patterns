import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import CarouselContainer from './features/carousel/CarouselContainer';

function App() {
  return (
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
          Nav
        </div>)
      }
      renderContents={
        () => (<>
          <CarouselContainer />
        </>)
      } />
  );
}

export default App;
