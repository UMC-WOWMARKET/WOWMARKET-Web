import "../styles/MyPage.css";

import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import InfoContent from "../components/MyPage/InfoContent";
import OrderContent from "../components/MyPage/OrderContent";
import ProjectContent from "../components/MyPage/ProjectContent";

const MyPage = () => {
  const [pageType, setPageType] = useState("info");
  useEffect(() => {
    console.log(`pageType: ${pageType}`);
  }, [pageType]);
  return (
    <div className="MyPage">
      <NavigationBar pageType={pageType} setPageType={setPageType} />
      {pageType === "info" && <InfoContent />}
      {pageType === "order" && <OrderContent />}
      {pageType === "project" && <ProjectContent />}
    </div>
  );
};

export default MyPage;
