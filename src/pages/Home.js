import { useParams, useSearchParams } from "react-router-dom";
import Search from "./Search";

const handleSearch = (searchTerm) => {
  // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
  console.log('검색어:', searchTerm);
};

const Home = () => {

  return (
    <div className="Home">
      <div className="GoodsList_header">
      </div>
      <div className="Search">
      <Search onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Home;

