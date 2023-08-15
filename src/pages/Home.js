
import React from "react";
import { Link } from "react-router-dom";
import Arrangement from "../components/Arrangement";
import "./Home.css";
import styled from 'styled-components';
import Search from "../components/Search";




const Home = () => {
  
const handleSearch = (searchTerm) => {
  // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
  console.log('검색어:', searchTerm);
};

  return (
    <div className="main">
      <div className="SearchBox">
      <Search onSearch={handleSearch} />
      </div>
      <div className="visual">
        <img src="images/banner1.jpg" alt="배너이미지" />
      </div>
      <div className="Home-Intro">
        <Intro1>우리들의 굿즈상점, 와우상점입니다</Intro1>
        <Intro2>판매중인 학교 굿즈를 확인해보세요!</Intro2>
      </div>
      <div><Arrangement/></div>
    </div>
  );
};

export default Home;

const Intro1 = styled.div`
  font-size : 32px;
  font-family : Pretendard;
  text-align : left;
  color : #646464
  `

const Intro2 =styled.div`
  font-size : 20px;
  font-family : Pretendard;
  text-align : left;
  color : #A0A0A0
`