import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  //로그인 입력값 유효성 검사-> 버튼 활성화
  const changeButton = () => {
    id.includes("@") && pw.length >= 5 ? setButton(false) : setButton(true);
  };

  const LoginFunc = (e) => {
    //입력 성공 axios통신
    let body = {
      user_email,
      user_password,
    };

    axios
      .post("localhost:8080/wowmarket/users/login/email", body)
      .then((res) => {
        console.log(res.data);
      });

    if (true) {
      e.stopPropagation();
      navigate(`/?user_id=${id}`);
    } else {
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
  };

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
          onKeyUp={changeButton}
        />
        <div className="subtitle">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="login"
          onChange={(e) => {
            setPw(e.target.value);
          }}
          onKeyUp={changeButton}
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
        <div>회원가입</div>
        <div>비밀번호 재설정</div>
      </div>
    </div>
  );
};

export default Login;
