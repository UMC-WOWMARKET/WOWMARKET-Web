import React from "react";
import { Link } from "react-router-dom";
import Arrangement from "../components/Arrangement";
import "./Home.css";
import styled from 'styled-components';
import Search from "../components/Search";


const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");
  const handleSearch = (searchTerm) => {
    // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
    console.log(`${page_type} 굿즈 리스트 페이지 렌더링`);

  // url : /goods?page_type=selling
   // 판매 : /demand/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}
  /*
  {
    univ: string,
    total_page: int,
    current_page: int,
    project_list: [
        {
            project_id : Long
            project_name: String,
            seller_name: String,
            start_date: date,
            end_date: date,
            thumbnail: String,
            achived: int,
            goal: int
        },
        {…}
    ]
}
*/

 
  if (page_type === "selling") {
    //판매 굿즈리스트 데이터 받기
  } else {
    //수요조사 굿즈리스트 데이터 받기
  }
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
        <Banner />
        <FilterBar />
      </div>
     
      </div>
    </div>
  );
};

export default Home;
