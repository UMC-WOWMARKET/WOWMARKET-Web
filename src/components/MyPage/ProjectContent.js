import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectContent = () => {
  //axios연동
  const [projectList, setProjectList] = useState([]); // 주문 데이터를 저장할 상태
  const page = 1;
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }
      return config;
    });

    axios
      .get(`https://www.wowmkt.kr/mypage/myorder?page=${page}`)
      .then((res) => {
        const responseData = res.data;
        console.log(`나의 주문폼 리스트 ${responseData.orderList}`);
        setProjectList(responseData.orderList);
      })
      .catch((err) => {
        alert("나의 주문폼 로딩 실패!");
      });
  }, []);

  return <div className="ProjectContent"></div>;
};

export default ProjectContent;
