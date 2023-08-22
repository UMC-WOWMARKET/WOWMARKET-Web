import "../styles/MyPage.css";

import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import InfoContent from "../components/MyPage/InfoContent";
import OrderContent from "../components/MyPage/OrderContent";
import ProjectContent from "../components/MyPage/ProjectContent";
import ProjectDetail from "../components/MyPage/ProjectDetail"

const MyPage = () => {
  const [pageType, setPageType] = useState("info"); //info, order, selling_register, selling_order, demand_register
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const handleProjectClick = (projectId) => {
    setPageType("selling_register_detail");
    setSelectedProjectId(projectId);
  };
  const handleGoBack = () => {
    setPageType("selling_register");
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
        <ProjectContent pageType={pageType} setPageType={setPageType}
        onProjectClick={handleProjectClick} />
      )}
      {(pageType === "selling_register_detail") && (
       <ProjectDetail 
       project_id={selectedProjectId}
       onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default MyPage;
