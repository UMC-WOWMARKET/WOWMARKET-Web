import React, { useEffect, useState } from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]); // 주문 데이터를 저장할 상태
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get("https://www.wowmkt.kr/wowmarket/mypage/myorder?page=${page}")
      .then((res) => {
        const responseData = res.data;
        setOrderList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });
  }, []);
  return (
    <div className="MyOrder">
      <NavigationBar />
      <div className="MyOrderContent">
        <div className="title">나의 주문폼</div>
        <div className="order_space">
          <div className="header">
            <div className="first">번호</div>
            <div className="second">프로젝트 제목</div>
            <div className="third">제출일</div>
            <div className="last">비고</div>
          </div>
          {orderList.map((order, index) => (
            <div className="content" key={order.orderid}>
              <div className="order_num">{index + 1}</div>
              <div className="order_title">{order.name}</div>
              <div className="order_date">{order.createdtime}</div>
              <div className="order_memo">
                {order.is_del
                  ? "취소완료"
                  : order.status === 0
                  ? "확정대기"
                  : order.status === 1
                  ? "주문확정"
                  : order.status === 2
                  ? "배송중"
                  : order.status === 3
                  ? "배송완료"
                  : ""}
              </div>
            </div>
          ))}
        </div>
        <div className="footer">
          <div> 프로젝트 제목을 클릭하면 주문폼 내용을 확인할 수 있습니다.</div>
          <div> 확정 대기 상태에서는 주문폼 수정 및 주문취소가 가능합니다.</div>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
