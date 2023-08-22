import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DemandRegister from "./pages/DemandRegister";
import ProjectRegister from "./pages/ProjectRegister";
import Users from "./pages/Users";
import Goods from "./pages/Goods";
import MyPage from "./pages/MyPage";
import ProjectDetail from "./components/MyPage/ProjectDetail";
import DemandDetail from "./components/MyPage/DemandDetail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goods" element={<Home />} />
          <Route path="/users/:page_type" element={<Users />} />
          <Route path="/register/demand" element={<DemandRegister />} />
          <Route path="/register/project" element={<ProjectRegister />} />
          <Route path="/goods/detail" element={<Goods />} />
          <Route path="/myinfo" element={<MyPage />} />
          <Route path="/myinfo/myproject/detail/:id" element={<ProjectDetail />}  />
          <Route path="/myinfo/mydemand/detail/:id" element={<ProjectDetail />}  />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
