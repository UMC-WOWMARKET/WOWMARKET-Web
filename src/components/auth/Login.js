import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import kakao from "./kakao.svg";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  const handleNavigateToJoin = useCallback(() => {
    navigate("/users/join");
  }, [navigate]);

  const handleNavigateToResetPw = useCallback(() => {
    navigate("/users/resetPw");
  }, [navigate]);

  const handleNavigateToKakaoLogin = useCallback(() => {
    //base url무시하고 카카오 로그인 페이지로 이동
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=394cbd2e5e0ad400adbc202784ad624b&redirect_uri=https://wowmarket-web.vercel.app/users/kakao&response_type=code";
  }, [navigate]);

  const LoginFunc = (e) => {
    //입력 성공 axios통신
    let body = {
      email: id,
      password: pw,
    };

    console.log(`로그인데이터:${id},${pw}`);
    axios
      .post("https://www.wowmkt.kr/users/login", body)
      .then((res) => {
        console.log(res.data);
        //accessToken 저장
        if (res.data.jwtAccessToken) {
          localStorage.setItem("accessToken", res.data.jwtAccessToken);
        }
        // 임시 비밀번호면 resetPW로 넘기기
        if (res.data.temporaryPw) {
          console.log("비밀번호 재설정으로");
          e.stopPropagation();
          navigate(`/users/TempPw?user_id=${id}`);
        } else {
          navigate(`/`);
        }
        //univ데이터 저장
        if (res.data.univ) {
          localStorage.setItem("univ", res.data.univ);
        }
      })
      .catch((err) => {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      });
  };

  useEffect(() => {
    //입력값 유효성 검사-> 버튼 활성화
    id.includes("@") && pw.length >= 5 ? setButton(false) : setButton(true);
  }, [id, pw]);

  return (
    <div className="Login">
      <div className="title">이메일로 로그인</div>

      <div className="input_body">
        <div className="subtitle1">이메일 주소</div>
        <input
          placeholder="이메일 주소를 입력해주세요"
          className="input_box"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <div className="subtitle2">비밀번호</div>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="input_box"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
      </div>

      <div className="input_footer">
        <button
          type="button"
          className="login_button"
          disabled={button}
          onClick={LoginFunc}
        >
          로그인
        </button>

        <button className="kakao_button" onClick={handleNavigateToKakaoLogin}>
          <img
            src={kakao}
            style={{
              position: "absolute",
              top: "465px",
              left: "70px",
            }}
          />
          카카오 로그인
        </button>
      </div>

      <div>
        <button className="navigation" onClick={handleNavigateToJoin}>
          회원가입
        </button>
        <button className="navigation" onClick={handleNavigateToResetPw}>
          비밀번호 재설정
        </button>
      </div>
    </div>
  );
};

export default Login;
