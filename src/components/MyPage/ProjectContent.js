import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectContent = ({ pageType, setPageType }) => {
  //axios연동
  const [projectList, setProjectList] = useState([]); // 주문 데이터를 저장할 상태
  const [pageNo, setPageNo] = useState("1");

  //selling_register
  let url = `https://www.wowmkt.kr/mypage/myproject?page=${pageNo}`;

  useEffect(() => {
    if (pageType === "selling_register") {
      url = `https://www.wowmkt.kr/mypage/myproject?page=${pageNo}`;
    } else if (pageType === "selling_order") {
      url = `https://www.wowmkt.kr/mypage/myproject/order?page=${pageNo}`;
    } else if (pageType === "demand_register") {
      url = `https://www.wowmkt.kr/mypage/myproject/demand?page=${pageNo}`;
    }
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get(url)
      .then((res) => {
        const responseData = res.data;
        console.log(`목록 데이터 ${responseData}`);
        // setProjectList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });
  }, [pageType]);

  return (
    <div className="ProjectContent">
      <div className="header">
        <select
          onChange={(e) => {
            setPageType(e.target.value);
          }}
        >
          <option value="selling_register">나의 판매 등록폼</option>
          <option value="selling_order">나의 판매 주문폼</option>
          <option value="demand_register">나의 수요조사 등록폼</option>
        </select>
      </div>
      <div className="body">{/* 목록 컴포넌트 */}</div>
      <div className="footer">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default ProjectContent;
