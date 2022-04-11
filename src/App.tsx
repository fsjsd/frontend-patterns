import React from 'react';
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';
import WebVitals from './shell/webvitals/WebVitals';
import ContentFooter from './ux/styles/ContentFooter';
import BrowserStats from './shell/browserstats/BrowserStats';
import { ReactComponent as LogoFsJsDev } from "./ux/icons/LogoFsjsDev.svg";
import { PageHeader } from './ux/PageHeader';
import styled from 'styled-components';
import { SiteContainer } from './ux/styles/SiteContainer';
import { SectionDrawer } from './ux/styles/SectionDrawer';
import { HeaderBrand } from './ux/styles/HeaderBrand';
import { SectionMain } from './ux/styles/SectionMain';

const PageContent = styled.div`
  flex-grow: 1;
  overflow-y: "auto";
`;

function App({ hostContext }: { hostContext: string }) {
  return (
    <BrowserRouter>
      <SiteContainer>
        <SectionDrawer>
          <HeaderBrand>
            <LogoFsJsDev style={{
              height: "24px",
              width: "100px",
            }} />
          </HeaderBrand>
          <div className="navigation">
            {/* Filter control for nav */}
            <LeftNavigation />
          </div>
        </SectionDrawer>

        <SectionMain>
          <PageHeader />
          <PageContent>
            <Routes>
              {appRoutes.map(routeDefinition => <Route
                key={routeDefinition.path}
                path={routeDefinition.path}
                element={<React.Suspense fallback={<Loading />}>{routeDefinition.element}</React.Suspense>} />
              )}
            </Routes>
          </PageContent>
          <ContentFooter role="contentinfo" aria-label='Web vitals information' title={hostContext}>
            <div style={{ flexGrow: 1 }}>
              <WebVitals />
            </div>
            <div style={{ flexGrow: 0 }}>
              <BrowserStats />
            </div>
          </ContentFooter>
        </SectionMain>
      </SiteContainer>
    </BrowserRouter >
  );
}

export default App;
