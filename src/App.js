import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
//import ProjectRegister from "./pages/ProjectRegister";
import DemandRegister from "./pages/DemandRegister";
import Users from "./pages/Users";
import Goods from "./pages/Goods";
import Search from "./components/Search";
import React, { useState } from 'react';

function App() {

  return (
    <BrowserRouter>
    <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register/demand" element={<DemandRegister />} />
          <Route path="/detail/:goods_id" element={<Goods />} />
          <Route path="/mypage/:user_id" element={<MyPage />} />
        </Routes>       
      </div>
  
    </BrowserRouter>
    
    
  );
}


export default App;

