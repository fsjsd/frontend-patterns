import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';
import WebVitals from './features/webvitals/WebVitals';
import ContentFooter from './ux/ContentFooter';

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
          () => {
            return (<>
              <Routes>
                {appRoutes.map(routeDefinition => <Route
                  key={routeDefinition.path}
                  path={routeDefinition.path}
                  element={<React.Suspense fallback={<Loading />}>{routeDefinition.element}</React.Suspense>} />
                )}
              </Routes>
              <ContentFooter role="contentinfo" aria-label='Web vitals information'>
                <WebVitals />
              </ContentFooter>
            </>);
          }
        } />
    </BrowserRouter>
  );
}

export default App;
