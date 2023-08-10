import { useParams } from "react-router-dom";
import { Link, Route, Switch } from "react-router-dom";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="NavigationBar">
      <Link className="myInfo" to={"/MyInfo"}>
        나의 정보
      </Link>
      <Link className="myOrder" to={"/MyOrder"}>
        나의 주문폼
      </Link>
      <Link className="myProject" to={"/MyProject"}>
        나의 프로젝트
      </Link>
    </div>
  );
};

export default NavigationBar;
