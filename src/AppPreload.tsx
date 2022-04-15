import React, { PropsWithChildren } from 'react';
import { PageHeader } from './ux/PageHeader';
import { ThemeProvider } from 'styled-components';
import theme from './ux/theme';
import { SectionMain, SiteContainer, FixedApp, HeaderBrand } from './AppStyles';
import { NavigationDrawer, NavigationScrollArea } from './ux/NavigationContainerStyles';
import { TombStoneContent } from './ux/designsystem/TombStones';
import "./reset.css";
import "./index.css";

// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/59765
const ThemeProviderFixed = ThemeProvider as unknown as React.FC<PropsWithChildren<{ theme: typeof theme }>>;

/**
 * This is a copy of "App" minus all interactive elements. It's intended
 * to be used for the pre-rendered static public/index.html. See the 
 * AppPreload.test.tsx for more information
 * @returns 
 */
function AppPreload() {

  /*
   * Uncomment this to run in a browser and get the DOM rendered.
   * This will not tree-shake CSS like jest-styled-components does, however
   * this will include CSS keyframes and correctly close HTML tags

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
  */

  // Note: root element (FixedApp) id deliberately set to 
  // make HTML output work in public/index.html
  return (
    <ThemeProviderFixed theme={theme}>
      <FixedApp id="root">
        <SiteContainer>
          <NavigationDrawer visible={false}>
            <HeaderBrand />
            <NavigationScrollArea role="navigation" />
          </NavigationDrawer>
          <SectionMain>
            <PageHeader showLinks={false} />
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
