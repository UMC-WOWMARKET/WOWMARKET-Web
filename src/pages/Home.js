
import React from "react";
import { Link } from "react-router-dom";
import Arrangement from "../components/Arrangement";
import GoodsList from './GoodsList';
import "./Home.css";


const Home = () => {

  return (
    <div className="main">
            <Arrangement/>
      <div className="visual">
        <img src="images/banner1.jpg" alt="배너이미지" />
      </div>
      <div className="product">
        <h2>굿즈상점, 와우상점입니다</h2>
        <h3>판매중인 학교 굿즈를 확인해보세요!</h3>
      </div>
      <GoodsList/>
    </div>
  );
};

export default Home;
