import { useSearchParams } from "react-router-dom";
import GoodsInfo from "../components/Goods_detail/GoodsInfo";
import GoodsBoard from "../components/Goods_detail/GoodsBoard";
import OrderForm from "../components/OrderForm";
import DemandForm from "../components/Goods_detail/DemandForm";
import Search from "../components/Goods_list/Search";

import axios from 'axios';

axios.interceptors.request.use((config) => {
	/* JWT 토큰 */
	const userAccessToken = localStorage.getItem("accessToken");
	if (userAccessToken) {
		console.log(userAccessToken);
		config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
	}
	return config;
});

const Goods = () => {
  const [searchParams] = useSearchParams();
  const goods_id = searchParams.get("id");
  const page_type = searchParams.get("page_type");

  // url : /goods/detail?page_type=selling&id=3
  console.log(`${page_type} 상세 페이지 렌더링`);
  console.log(`상품아이디_${goods_id}`);

  //axios Get 으로 데이터 다 받아서 자식 컴포넌트에 필요한 것만 내려주기

  return (
    <div className="Goods">
      <div className="left_side">
        <GoodsInfo goods_id='4'/>
        <GoodsBoard goods_id='4'/>
      </div>
      <div className="right_side">
        {page_type === "selling" && <OrderForm goods_id='4'/>}
        {page_type === "demand" && <DemandForm />}
      </div>
    </div>
  );
};

export default Goods;
