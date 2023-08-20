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
import Button from "./components/Button";
import MyOrder from "./pages/MyOrder";
import MyProject from "./pages/MyProject";
import MyInfo from "./pages/MyInfo";
import MySaleForm from "./pages/MySaleForm";
import MyOrderForm from "./pages/MyOrderForm";
import MyDemandForm from "./pages/MyDemandForm";
import MyPage from "./pages/MyPage";

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

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/myproject" element={<MyProject />} />

          <Route path="/mysaleform" element={<MySaleForm />} />
          <Route path="/myorderform" element={<MyOrderForm />} />
          <Route path="/mydemandform" element={<MyDemandForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
