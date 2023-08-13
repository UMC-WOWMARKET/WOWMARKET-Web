import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";

const MyPage = (props) => {
  /*
{
userid: Long
name: string
email: string
}
*/
  //axios get해와서 유저 정보 받기
  return (
    <div className="MyPage">
      <div className="title">마이페이지</div>
      <div className="navigation_bar">
        <NavigationBar />
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default MyPage;
