import React, { PropsWithChildren, useLayoutEffect } from 'react';
import { PageHeader } from './ux/PageHeader';
import { ThemeProvider } from 'styled-components';
import theme from './ux/theme';
import { SectionMain, SiteContainer, FixedApp, HeaderBrand } from './AppStyles';
import { NavigationDrawer, NavigationScrollArea } from './ux/NavigationContainerStyles';
import { TombStoneContent } from './ux/designsystem/TombStones';

// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/59765
const ThemeProviderFixed = ThemeProvider as unknown as React.FC<PropsWithChildren<{ theme: typeof theme }>>;


function AppPreload() {

  useLayoutEffect(() => {
    const documentContent = document.querySelector("#root")?.innerHTML;
    // Dump HTML ...
    console.log(documentContent);

    let css = "";
    // Dump Stylesheets ...
    Array.from(document.styleSheets).forEach((sheet) => {
      const cssRules = Array.from(sheet.cssRules).map(rule => rule.cssText).join("\n");
      css += cssRules;
      // console.log("CSS:");
      // console.log(cssRules)
    });
    console.log(css);
  }, []);

  const handleMenuClick = () => {
    // no op
  }

  return (
    <ThemeProviderFixed theme={theme}>
      <FixedApp>
        <SiteContainer>
          <NavigationDrawer visible={false}>
            <HeaderBrand />
            <NavigationScrollArea role="navigation" />
          </NavigationDrawer>
          <SectionMain>
            <PageHeader showLinks={false} onMenuClick={handleMenuClick} />
            <div style={{ padding: "15px" }}>
              <TombStoneContent />
            </div>
          </SectionMain>
        </SiteContainer>
      </FixedApp>
    </ThemeProviderFixed>
  );
}

export default AppPreload;
