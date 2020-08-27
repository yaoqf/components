import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import TestMgUpload from "./TestMgUpload";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <TestMgUpload />
  </React.StrictMode>,
  rootElement
);
