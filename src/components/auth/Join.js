import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import axios from "axios";

const Join = () => {
  const JoinFunc = () => {
    //입력 성공 axios통신
    let join_body = {
      name: "이은비ㄱ",
      email: "ekdldkaaa@naver.com",
      password: "ekdldkaaa",
    };
    axios.post("http://localhost:8080/member/join", join_body).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="Join">
      <button onClick={JoinFunc}>임시 회원가입</button>
    </div>
  );
};

export default Join;
