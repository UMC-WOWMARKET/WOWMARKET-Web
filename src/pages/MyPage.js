import "../styles/MyPage.css";

import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import InfoContent from "../components/MyPage/InfoContent";
import OrderContent from "../components/MyPage/OrderContent";
import ProjectContent from "../components/MyPage/ProjectContent";
import ProjectDetail from "../components/MyPage/ProjectDetail";
import DemandDetail from "../components/MyPage/DemandDetail";

const MyPage = () => {
  const [pageType, setPageType] = useState("info"); //info, order, selling_register, selling_order, demand_register
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  //판매 등록인지, 수요조사 등록인지에 따라 다르게 렌더링
  const handleProjectClick = (projectId) => {
    if (pageType === "selling_register") {
      setPageType("selling_register_detail");
    } else if (pageType === "demand_register") {
      setPageType("demand_register_detail");
    }
    setSelectedProjectId(projectId);
  };
  const handleGoBack = () => {
    if (pageType === "selling_register_detail") {
      setPageType("selling_register");
    }else if (pageType === "demand_register_detail"){
      setPageType("demand_register");
    }
    setSelectedProjectId(null);
  };

  useEffect(() => {
    console.log(`pageType: ${pageType}`);
  }, [pageType]);

  return (
    <div className="MyPage">
      <NavigationBar pageType={pageType} setPageType={setPageType} />
      {pageType === "info" && <InfoContent />}
      {pageType === "order" && <OrderContent />}
      {(pageType === "selling_register" ||
        pageType === "selling_order" ||
        pageType === "demand_register") && (
        <ProjectContent
          pageType={pageType}
          setPageType={setPageType}
          onProjectClick={handleProjectClick}
        />
      )}
      {pageType === "selling_register_detail" ? (
        <ProjectDetail project_id={selectedProjectId} onGoBack={handleGoBack} />
      ) : pageType === "demand_register_detail" ? (
        <DemandDetail project_id={selectedProjectId} onGoBack={handleGoBack} />
      ) : null}
    </div>
  );
};

export default MyPage;
