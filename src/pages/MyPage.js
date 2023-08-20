import "../styles/MyPage.css";

import React from "react";
import NavigationBar from "../components/MyPage/NavigationBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const MyPage = () => {
  const [pageType, setPageType] = useState("info");
  useEffect(() => {
    console.log(`pageType: ${pageType}`);
  }, [pageType]);
  return (
    <div className="MyPage">
      <NavigationBar pageType={pageType} setPageType={setPageType} />
    </div>
  );
};

export default MyPage;
