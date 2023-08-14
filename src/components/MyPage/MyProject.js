import MyPage from "../../pages/MyPage";
import React from "react";
import NavigationBar from "./NavigationBar";

const MyProject = () => {
  return (
    <div className="MyProject">
      <NavigationBar />
      <div className="title">나의 프로젝트 </div>
    </div>
  );
};

export default MyProject;
