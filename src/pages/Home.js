import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");

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

  // url2 : /sale/home?pageNo=${pageNo}&orderBy=${orderBy}&univ=${univ}
  console.log(`${page_type} 굿즈 리스트 페이지 렌더링`);

  if (page_type === "selling") {
    //판매 굿즈리스트 데이터 받기
  } else {
    //수요조사 굿즈리스트 데이터 받기
  }
  return (
    <div className="Home">
      <div className="GoodsList_header">
        <SearchBar />
        <Banner />
        <FilterBar />
      </div>
      <div className="GoodsList_body">
        <div>
          {page_type === "selling" && "판매"}
          {page_type === "demand" && "수요조사"}
        </div>
      </div>
    </div>
  );
};

export default Home;
