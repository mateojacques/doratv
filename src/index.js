import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import "material-symbols";
import TvContextProvider from "./contexts/tvContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TvContextProvider>
      <App />
    </TvContextProvider>
  </React.StrictMode>
);
