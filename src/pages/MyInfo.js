import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";

const MyInfo = () => {
  return (
    <div className="MyInfo">
      <NavigationBar />
      <div className="MyInfoContent">
        <div className="title">나의 정보</div>
        <div className="info_space">
          <div className="info_name">
            <div className="subtitle">이름</div>
            <div className="name">김와우</div>
          </div>
          <div className="info_email">
            <div className="subtitle">이메일</div>
            <div className="email">wow1234@mail.com</div>
          </div>
          <div className="info_univ">
            <div className="subtitle">소속학교</div>
            <div className="univ">와우대학교</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
