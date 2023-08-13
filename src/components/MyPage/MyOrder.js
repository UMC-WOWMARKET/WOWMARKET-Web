import MyPage from "../../pages/MyPage";
import React from "react";
import NavigationBar from "./NavigationBar";

const MyOrder = () => {
  return (
    <div className="MyOrder">
      <NavigationBar />
      <div className="title">나의 주문폼</div>
    </div>
  );
};

export default MyOrder;
