import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="NavigationBar">
      <div className="title">마이페이지</div>
      <div className="nav_box">
        <Link className="myInfo" to={"/myinfo"}>
          나의 정보
        </Link>
        <Link className="myOrder" to={"/myorder"}>
          나의 주문폼
        </Link>
        <Link className="myProject" to={"/myproject"}>
          나의 프로젝트
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
