import { useParams, useSearchParams } from "react-router-dom";
import Banner from "../components/Banner";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");

  // url : /goods?page_type=selling
  console.log(`${page_type} 굿즈 리스트 페이지 렌더링`);

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
        <div>GoodsList</div>
      </div>
    </div>
  );
};

export default Home;
