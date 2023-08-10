import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function Kakao() {
  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get("code");
  console.log(code);

  axios
    .post(`http://localhost:8080/wowmarket/users/kakao/login?code=${code}`, {})
    .then((res) => {
      console.log(res.data);
      const { accessToken } = res.data.accessToken;
      axios.defaults.headers.common["X-ACCESS-TOKEN"] = `${accessToken}`;
      e.stopPropagation();
      navigate(`/`);
    })
    .catch((err) => {
      alert("카카오 로그인 오류! 다시 시도하세요");
    });

  return <div className="Kakao"></div>;
}

export default Kakao;
