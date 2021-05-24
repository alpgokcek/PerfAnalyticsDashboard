import "core-js/es6/string";
import "core-js/es6/array";
import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/object";
import "core-js/es6/promise";
import "core-js/es7/object";
import "core-js/es7/array";
import "raf/polyfill";
import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Dashboard from "./pages/Dashboard";

import configureStore from "./store";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
