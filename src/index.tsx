/* istanbul ignore file */
import React from "react";
import { createRoot } from 'react-dom/client';
import "./reset.css";
import "./index.css";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).fsjsdevboot = ({ hostContext }: { hostContext: string }) => {
  // looks like React 18's typedefs are wrong for createRoot - should be null not undefined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <App hostContext={hostContext} />
    </React.StrictMode>
  );
}