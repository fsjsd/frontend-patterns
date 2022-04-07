import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';
import WebVitals from './shell/webvitals/WebVitals';
import ContentFooter from './ux/ContentFooter';
import BrowserStats from './shell/browserstats/BrowserStats';

function App({ hostContext }: { hostContext: string }) {
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
              <ContentFooter role="contentinfo" aria-label='Web vitals information' title={hostContext}>
                <div style={{ flexGrow: 1 }}>
                  <WebVitals />
                </div>
                <div style={{ flexGrow: 0 }}>
                  <BrowserStats />
                </div>
              </ContentFooter>
            </>);
          }
        } />
    </BrowserRouter>
  );
}

export default App;
