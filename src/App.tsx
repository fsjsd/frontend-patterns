import React, { useState } from 'react';
import { NavigationMenu } from './ux/NavigationContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import appRoutes from './routes';
import Loading from './ux/Loading';
import WebVitals from './shell/webvitals/WebVitals';
import BrowserStats from './shell/browserstats/BrowserStats';
import { ReactComponent as LogoFsJsDev } from "./ux/icons/LogoFsjsDev.svg";
import { PageHeader } from './ux/PageHeader';
import styled, { ThemeProvider } from 'styled-components';
import theme from './ux/theme';
import { SectionMain, SiteContainer, FixedApp, HeaderBrand } from './AppStyles';
import { ContentFooter } from './ux/ContentContainerStyles';
import { NavigationDrawer } from './ux/NavigationContainerStyles';

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
        <FixedApp>
          <SiteContainer>
            <NavigationDrawer visible={showMenu}>
              <HeaderBrand>
                <SiteLogo />
              </HeaderBrand>
              <NavigationMenu onItemClick={handleLinkClick} />
            </NavigationDrawer>
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
        </FixedApp>
      </BrowserRouter >
    </ThemeProvider>
  );
}

export default App;
