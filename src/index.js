import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
//axios.defaults.withCredentials = true;
//해당 설정 때문에 presignedUrl 보내는 게 error가 떠서 우선 주석 처리 해놓았습니다.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
