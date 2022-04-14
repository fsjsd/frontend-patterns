import React, { useLayoutEffect } from 'react';
import { PageHeader } from './ux/PageHeader';
import { ThemeProvider } from 'styled-components';
import theme from './ux/theme';
import { SectionMain, SiteContainer, FixedApp, HeaderBrand } from './AppStyles';
import { NavigationDrawer, NavigationScrollArea } from './ux/NavigationContainerStyles';
import { TombStoneContent } from './ux/designsystem/TombStones';

function AppShell() {

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
    //document.styleSheets[0].cssRules['0']
  }, []);

  const handleMenuClick = () => {
    // no op
  }

  return (
    <ThemeProvider theme={theme}>
      <FixedApp>
        <SiteContainer>
          <NavigationDrawer visible={false}>
            <HeaderBrand>

            </HeaderBrand>
            <NavigationScrollArea role="navigation">

            </NavigationScrollArea>
          </NavigationDrawer>
          <SectionMain>
            <PageHeader showLinks={false} onMenuClick={handleMenuClick} />
            <div style={{ padding: "15px" }}>
              <TombStoneContent />
            </div>
          </SectionMain>
        </SiteContainer>
      </FixedApp>
    </ThemeProvider >
  );
}

export default AppShell;
