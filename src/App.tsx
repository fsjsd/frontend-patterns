import React from 'react';
import './App.css';
import DemoSiteLayoutContainer from "fsjsd-demosite";
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';

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
            {appRoutes.map(routeDefinition =>
              <Route
                path={routeDefinition.path}
                element={<React.Suspense fallback={<Loading />}>{routeDefinition.element}</React.Suspense>}
              />
            )}
          </Routes>)
        } />
    </BrowserRouter>
  );
}

export default App;
