import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderDetail from "./OrderDetail";

const OrderContent = () => {
  const [orderList, setOrderList] = useState([]); // 주문 데이터를 저장할 상태
  const page = 1;
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
      .get(`https://www.wowmkt.kr/mypage/myorder?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        console.log(`나의 주문폼 리스트 ${responseData.orderList}`);
        setOrderList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });
  }, []);
  return (
    <div className="OrderContent">
      <div className="MyOrder">
        <div className="MyOrderContent">
          <div className="title">나의 주문폼</div>
          <div className="order_space">
            <div className="header">
              <div className="first">번호</div>
              <div className="second">프로젝트 제목</div>
              <div className="third">제출일</div>
              <div className="last">비고</div>
            </div>
            {orderList.map((order, index) => {
              const orderDate = new Date(order.createdtime);
              const formattedDate = orderDate.toISOString().split("T")[0];

              return (
                <div className="content" key={order.orderid}>
                  <div className="order_num">{index + 1}</div>
                  <div className="order_title">{order.name}</div>
                  <div className="order_date">{formattedDate}</div>
                  <div className="order_memo">{order.status}</div>
                </div>
              );
            })}
          </div>

          <div className="footer">
            <div>
              {" "}
              프로젝트 제목을 클릭하면 주문폼 내용을 확인할 수 있습니다.
            </div>
            <div>
              {" "}
              확정 대기 상태에서는 주문폼 수정 및 주문취소가 가능합니다.
            </div>
          </div>
        </div>
      </div>
      <OrderDetail />
    </div>
  );
};

export default OrderContent;
