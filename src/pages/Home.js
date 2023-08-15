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
          <img src="assets/banner.png" alt="배너이미지" />
        </div>
        <div><Arrangement/></div>
      </div>
    );
  };
  
  export default Home;
 