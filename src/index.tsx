/* istanbul ignore file */
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// Note: Uncomment these to edit and alter index.html with AppShell.tsx
// import "./reset.css";
// import "./index.css";
import App from "./App";
const AppShell = React.lazy(() => import("./AppShell")); // do this lazy since most of the time we won't use it

const shellMode = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).fsjsdevboot = ({ hostContext }: { hostContext: string }) => {
  ReactDOM.render(
    <React.StrictMode>
      {shellMode
        ? <Suspense fallback={<></>}><AppShell /></Suspense>
        : <App hostContext={hostContext} />}
    </React.StrictMode>,
    document.getElementById("root")
  );
}