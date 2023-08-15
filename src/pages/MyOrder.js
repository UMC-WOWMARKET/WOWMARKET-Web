import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";

const MyOrder = () => {
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
          <div className="content">
            <div className="order_num">1</div>
            <div className="order_title">ㅇㅇ 대학교 와움이 인형 세트</div>
            <div className="order_date">2023-08-11</div>
            <div className="order_memo">확정대기</div>
          </div>
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
