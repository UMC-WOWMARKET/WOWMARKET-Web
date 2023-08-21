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
import MyProject from "./pages/MyProject/MyProject";
import MyProjectOrder from "./pages/MyProject/MyProjectOrder";
import MyProjectDemand from "./pages/MyProject/MyProjectDemand";
import MyInfo from "./pages/MyInfo";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/goods" element={<Home />} />
          <Route path="/users/:page_type" element={<Users />} />
          <Route path="/register/demand" element={<DemandRegister />} />
          <Route path="/register/project" element={<ProjectRegister />} />
          <Route path="/goods/detail" element={<Goods />} ad />

          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/myproject" element={<MyProject />} />
          <Route path="/myproject/order" element={<MyProjectOrder />} />
          <Route path="/myproject/demand" element={<MyProjectDemand />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
