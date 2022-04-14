/* istanbul ignore file */
import React, { Suspense } from "react";
import { createRoot } from 'react-dom/client';
// Note: Uncomment these to edit and alter index.html with AppShell.tsx
// import "./reset.css";
// import "./index.css";
import App from "./App";
const AppShell = React.lazy(() => import("./AppPreload")); // do this lazy since most of the time we won't use it

const shellMode = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).fsjsdevboot = ({ hostContext }: { hostContext: string }) => {
  // looks like React 18's typedefs are wrong for createRoot - should be null not undefined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      {shellMode
        ? <Suspense fallback={<></>}><AppShell /></Suspense>
        : <App hostContext={hostContext} />}
    </React.StrictMode>);
}