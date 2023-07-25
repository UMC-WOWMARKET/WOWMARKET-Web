import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  const LoginFunc = (e) => {
    //입력 성공 axios통신
    let body = {
      id,
      pw,
    };
    axios.post("http://localhost:8080/member/login", body).then((res) => {
      console.log(res.data);
    });

    if (true) {
      //로그인 성공
      e.stopPropagation();
      navigate(`/?user_id=${id}`);
    } else {
      //로그인 실패
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    console.log(`id:${id}, pw:${pw}`);
    //로그인 입력값 유효성 검사-> 버튼 활성화
    id.includes("@") && pw.length >= 5 ? setButton(false) : setButton(true);
  }, [id, pw]);

  return (
    <div className="Login">
      <div className="title">이메일로 로그인</div>

      <div className="input_body">
        <div className="subtitle">이메일 주소</div>
        <input
          placeholder="이메일 주소를 입력해주세요"
          className="login"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <div className="subtitle">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="login"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </div>

      <div className="input_footer">
        <button
          type="button"
          className="loginButton"
          disabled={button}
          onClick={LoginFunc}
        >
          로그인
        </button>

        <button>카카오로 로그인</button>
      </div>

      <div>
        <button onClick={navigate("/users/")}>회원가입</button>
        <button onClick={navigate("/users/")}>비밀번호 재설정</button>
      </div>
    </div>
  );
};

export default Login;