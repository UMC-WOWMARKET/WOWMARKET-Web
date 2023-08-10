import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Goods from "./pages/Goods";
import Button from "./components/Button";
import MyOrder from "./components/MyPage/MyOrder";
import MyProject from "./components/MyPage/MyProject";
import MyInfo from "./components/MyPage/MyInfo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/goods" element={<Home />} />
          <Route path="/users/:page_type" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/goods/detail" element={<Goods />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/MyOrder" element={<MyOrder />} />
          <Route path="/MyProject" element={<MyProject />} />
          <Route path="/MyInfo" element={<MyInfo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
