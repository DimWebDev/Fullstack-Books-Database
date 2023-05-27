import React from "react";
import { AppRouter } from "./components/Router";
import "./style/style.css"; // import the CSS file

export const App = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};
