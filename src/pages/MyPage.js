import { useParams, Route, Switch, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import MyInfo from "../components/MyPage/MyInfo";
import MyOrder from "../components/MyPage/MyOrder";
import MyProject from "../components/MyPage/MyProject";

const MyPage = () => {
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
      <div className="content">
        <Routes>
          <Route path="/" element={<MyInfo />} />
          <Route path="/MyInfo" element={<MyInfo />} />
          <Route path="/MyOrder" element={<MyOrder />} />
          <Route path="/MyProject" element={<MyProject />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
