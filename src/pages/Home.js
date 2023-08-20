import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import GoodsCard from "../components/Goods_list/GoodsCard"; // GoodsCard 컴포넌트의 경로를 적절하게 수정해주세요.
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import banner_logo from "./banner_logo.svg";
import "../styles/Home.css";
import bannerBack from "./banner_back.png";

import Search from "../components/Goods_list/Search";
import Arrangement from "../components/Goods_list/Arrangement";
import GoodsBoard from "../components/Goods_detail/GoodsBoard";

//굿즈가 3개씩 보일 수 있도록 조절
function chunkArray(arr, size) {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
}

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");
  // 필터링 값
  const [pageNo, setPageNo] = useState(1);
  const [orderBy, setOrderBy] = useState("view"); // endDate, view, startDate
  const [univ, setUniv] = useState("allUniv"); // myUniv, allUniv
  const [projectList, setProjectList] = useState([]); // 프로젝트 목록 상태 추가
  const [searchTerm, setSearchTerm] = useState("");

  let url = `https://www.wowmkt.kr/sale/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;

  const handleSearch = (searchTerm) => {
    // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
    console.log("검색어:", searchTerm);
  };

  console.log(`${page_type} 굿즈 리스트 페이지 렌더링`);

  useEffect(() => {
    url = `https://www.wowmkt.kr/sale/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;
    if (page_type === "demand") {
      url = `https://www.wowmkt.kr/demand/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;
    }
    if (searchTerm) {
      url = `https://www.wowmkt.kr/sale?search=${searchTerm}&pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;
    }

    console.log(`url : ${url}`);

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get(url, {})
      .then((res) => {
        console.log(res.data.project_list);
        const fetchedProjectList = res.data.project_list;
        setProjectList(fetchedProjectList); // 프로젝트 목록 업데이트
      })
      .catch((err) => {});
  }, [orderBy, univ, page_type, searchTerm]);

  useEffect(() => {
    ///무한스크롤
    //axios로 데이터 받기
    //받은 데이터를 이미 있는 페이지 밑에 붙이기
  }, [pageNo]);

  return (
    <div className="main">
      <div className="SearchBox">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="banner_logo">
        <img src={banner_logo} alt="Banner" />
      </div>

      <div>
        <Arrangement
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          univ={univ}
          setUniv={setUniv}
        />
      </div>
      <div className="GoodsList_body">
        <div>
          {page_type === "selling" && "판매"}
          {page_type === "demand" && "수요조사"}
        </div>
      </div>
      <div className="goods-card-container">
        {chunkArray(projectList, 1).map(
          (
            group,
            groupIndex //여기서 보이는 굿즈카드의 개수를 조절합니다.
          ) => (
            <div key={groupIndex} className="goods-card-group">
              {group.map((project) => (
                <GoodsCard
                  id={project.project_id}
                  projectName={project.project_name}
                  sellerName={project.seller_name}
                  goal={project.goal}
                  achieved={project.achieved}
                  endDate={project.end_date}
                  startDate={project.start_date}
                  imgUrl={project.thumbnail}
                  page_type={page_type}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
