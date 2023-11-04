// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();

import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "../src/redux/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
