import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idCk, setIdCk] = useState("");
  const [pw, setPw] = useState("");
  const [pwCk, setPwCk] = useState("");

  const [option, setOption] = useState(false);
  const [check, setCheck] = useState(false);

  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  const JoinFunc = (e) => {
    //입력 성공 axios통신
    let body = {
      name: name,
      email: id,
      password: pw,
      marketing: option,
    };

    console.log(`axiosPost:${name},${id},${pw},${option}`);

    // axios.post("http://localhost:8080/member/join", body).then((res) => {
    //   console.log(res.data);
    // });

    if (true) {
      //회원가입 성공
      e.stopPropagation();
      navigate(`/users`);
    } else {
      //회원가입 실패
      alert("중복된 회원입니다");
    }
  };

  //입력값 유효성 검사->버튼활성화
  useEffect(() => {
    id.includes("@") &&
    pw.length >= 5 &&
    check &&
    name !== "" &&
    id === idCk &&
    pw === pwCk
      ? setButton(false)
      : setButton(true);
  }, [name, id, pw, check, idCk, pwCk]);

  return (
    <div className="Join">
      <div className="title">이메일로 회원가입</div>

      <div className="input_body">
        <div className="subtitle">이름</div>
        <input
          placeholder="사용하실 이름을 입력해주세요"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="subtitle">이메일주소</div>
        <input
          placeholder="이메일 주소를 입력해주세요"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          placeholder="이메일 주소를 확인합니다"
          onChange={(e) => {
            setIdCk(e.target.value);
          }}
        />

        <div className="subtitle">비밀번호</div>
        <input
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <input
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => {
            setPwCk(e.target.value);
          }}
        />

        <div>
          <input type="checkbox" onChange={(e) => setCheck(!check)} />
          전체동의
          <input type="checkbox" onChange={(e) => setOption(!option)} />
          마케팅수신
        </div>
      </div>
      <button disabled={button} onClick={JoinFunc}>
        회원가입
      </button>
    </div>
  );
};

export default Join;
