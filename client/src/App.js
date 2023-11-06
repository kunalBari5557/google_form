import "./App.css";
import Sidenav from "./Sidenav";
import { BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidenav />
      </BrowserRouter>
    </div>
  );
}

export default App;
