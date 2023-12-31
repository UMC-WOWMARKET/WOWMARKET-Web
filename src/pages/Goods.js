import { useState } from "react"; 

import { useSearchParams } from "react-router-dom";
import GoodsInfo from "../components/Goods_detail/GoodsInfo";
import GoodsBoard from "../components/Goods_detail/GoodsBoard";
import OrderForm from "../components/OrderForm";
import DemandForm from "../components/Goods_detail/DemandForm";
import Search from "../components/Goods_list/Search";
import axios from "axios";
import "../styles/Goods.css";

axios.interceptors.request.use((config) => {
  /* JWT 토큰 */
  const userAccessToken = localStorage.getItem("accessToken");
  if (userAccessToken) {
    config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
  }
  return config;
});

const Goods = () => {
  const [searchParams] = useSearchParams();
  const goods_id = searchParams.get("id");
  const page_type = searchParams.get("page_type");

  const [searchTerm, setSearchTerm] = useState("");

  // url : /goods/detail?page_type=selling&id=3
  console.log(`${page_type} 상세 페이지 렌더링`);
  console.log(`상품아이디_${goods_id}`);

  //axios Get 으로 데이터 다 받아서 자식 컴포넌트에 필요한 것만 내려주기
const handleSearch = (searchTerm) => {
    // 여기서 검색어를 이용하여 검색 기능을 구현하거나 다른 원하는 작업을 수행합니다.
    console.log("검색어:", searchTerm);
  };

  return (
    <div className="Goods">
          <div className="searchbar"><Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /></div>
      <div className="left_side" style={{width:'600px'}}>
        <GoodsInfo goods_id={goods_id} />
        <GoodsBoard goods_id={goods_id} />
      </div>
      
      <div className="right_side">
      
        {page_type === "selling" && <OrderForm goods_id={goods_id} />}
        {page_type === "demand" && <DemandForm goods_id={goods_id} />}
      </div>
    </div>
  );
};

export default Goods;
