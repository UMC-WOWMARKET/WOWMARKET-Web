import { useParams, useSearchParams } from "react-router-dom";
import GoodsInfo from "../components/goods_detail/GoodsInfo";
import GoodsBoard from "../components/goods_detail/GoodsBoard";
import OrderForm from "../components/OrderForm";
import DemandForm from "../components/goods_detail/DemandForm";

const Goods = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const goods_id = searchParams.get("id");
  const page_type = searchParams.get("page_type");

  // url : /goods/detail?page_type=selling&id=3
  console.log(`${page_type} 상세 페이지 렌더링`);
  console.log(`상품아이디_${goods_id}`);

  //axios Get 으로 데이터 다 받아서 자식 컴포넌트에 필요한 것만 내려주기

  return (
    <div className="Goods">
      <div className="left_side">
        <GoodsInfo />
        <GoodsBoard />
      </div>
      <div className="right_side" style={{ overflowY: 'scroll', maxHeight: '400px', border:'solid 0.5px'}}>
        {page_type === "selling" && <OrderForm />}
        {page_type === "demand" && <DemandForm />}
      </div>
    </div>
  );
};

export default Goods;
