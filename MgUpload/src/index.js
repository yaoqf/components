import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import MyUpload from "./MyUpload";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <MyUpload />
  </React.StrictMode>,
  rootElement
);
