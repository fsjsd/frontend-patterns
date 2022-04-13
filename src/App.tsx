import React, { useState } from 'react';
import LeftNavigation from './ux/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';
import WebVitals from './shell/webvitals/WebVitals';
import ContentFooter from './ux/styles/ContentFooter';
import BrowserStats from './shell/browserstats/BrowserStats';
import { ReactComponent as LogoFsJsDev } from "./ux/icons/LogoFsjsDev.svg";
import { PageHeader } from './ux/PageHeader';
import { SiteContainer } from './ux/styles/SiteContainer';
import { SectionDrawer } from './ux/styles/SectionDrawer';
import { HeaderBrand } from './ux/styles/HeaderBrand';
import { SectionMain } from './ux/styles/SectionMain';
import styled, { ThemeProvider } from 'styled-components';
import theme from './ux/theme';

const SiteLogo = styled(LogoFsJsDev)`
  height: 24px;
  width: 100px;
`;

function App({ hostContext }: { hostContext: string }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(prev => !prev);
  }

  const handleLinkClick = () => {
    setShowMenu(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SiteContainer>
          <SectionDrawer visible={showMenu}>
            <HeaderBrand>
              <SiteLogo />
            </HeaderBrand>
            <div role="navigation">
              {/* Filter control for nav */}
              <LeftNavigation onItemClick={handleLinkClick} />
            </div>
          </SectionDrawer>

          <SectionMain>
            <PageHeader onMenuClick={handleMenuClick} />
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
          </SectionMain>
        </SiteContainer>
      </BrowserRouter >
    </ThemeProvider>
  );
}

export default App;
