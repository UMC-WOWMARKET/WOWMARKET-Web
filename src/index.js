import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-ACCESS-TOKEN']='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MUBuYXZlci5jb20iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjkxODI1MjUxLCJleHAiOjE2OTE4Mjg4NTF9.m16rCJQzeNdmQu3cPN46mCrq0AG8ETAigSCD8CCErCs';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
