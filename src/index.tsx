/* istanbul ignore file */
import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import App from "./App";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).fsjsdevboot = ({ hostContext }: { hostContext: string }) => {
  ReactDOM.render(
    <React.StrictMode>
      <App hostContext={hostContext} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}