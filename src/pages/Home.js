import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Banner from "../components/Banner";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import GoodsCard from "../components/Goods_list/GoodsCard"; // GoodsCard 컴포넌트의 경로를 적절하게 수정해주세요.
import axios from "axios";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");
  // 필터링 값
  const [pageNo, setPageNo] = useState(1);
  const [orderBy, setOrderBy] = useState("view"); // endDate, view, startDate
  const [univ, setUniv] = useState("allUniv"); // myUniv, allUniv
  const [projectList, setProjectList] = useState([]); // 프로젝트 목록 상태 추가

  console.log(`${page_type} 굿즈 리스트 페이지 렌더링`);

  useEffect(() => {
    let url = `https://www.wowmkt.kr/demand/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;
    if (page_type === "selling") {
      url = `https://www.wowmkt.kr/sale/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}`;
    }

    axios
      .get(url, {})
      .then((res) => {
        console.log(res.data);
        console.log(res.data.project_list);
        const fetchedProjectList = res.data.project_list;
        setProjectList(fetchedProjectList); // 프로젝트 목록 업데이트
      })
      .catch((err) => {});
  }, [pageNo, orderBy, univ, page_type]);

  return (
    <div className="Home">
      <div className="GoodsList_header">
        <SearchBar />
        <Banner />
        <FilterBar />
      </div>
      <div className="GoodsList_body">
        <div className="title">
          {page_type === "selling" && "판매"}
          {page_type === "demand" && "수요조사"}
        </div>
        <div style={{ display: "inline-block", width: "100%", height: "100%" }}>
          {projectList.map((project) => (
            <GoodsCard
              key={project.project_id}
              projectName={project.project_name}
              sellerName={project.seller_name}
              goal={project.goal}
              achieved={project.achieved}
              endDate={project.end_date}
              startDate={project.start_date}
              imgUrl={project.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
