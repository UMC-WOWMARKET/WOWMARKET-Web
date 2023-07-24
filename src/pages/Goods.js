import { useParams } from "react-router-dom";

const Goods = () => {
  const { goods_id } = useParams();

  return (
    <div className="Goods">
      <div>{goods_id}번 상품</div>
      <div>상세보기 주문폼/참여폼</div>
    </div>
  );
};

export default Goods;
