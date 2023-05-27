import React from "react";
import { AppRouter } from "./components/Router";
import "./style/style.css"; // import the CSS file

export const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
};
