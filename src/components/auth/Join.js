import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Join = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [idCk, setIdCk] = useState("");
  const [pw, setPw] = useState("");
  const [pwCk, setPwCk] = useState("");

  const [serviceCk, setServiceCk] = useState(false);
  const [personalInfoCk, setPersonalInfoCk] = useState(false);
  const [provisionCk, setProvisionCk] = useState(false);
  const [marketingCk, setMarketingCk] = useState(false);
  const [check, setCheck] = useState(false);

  const [button, setButton] = useState(true);

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // 각 체크박스의 상태를 갱신
    if (name === "serviceCk") {
      setServiceCk(checked);
    } else if (name === "personalInfoCk") {
      setPersonalInfoCk(checked);
    } else if (name === "provisionCk") {
      setProvisionCk(checked);
    } else if (name === "marketingCk") {
      setMarketingCk(checked);
    }
  };

  // 전체 동의 버튼 클릭 시 모든 체크박스 선택/해제
  const handleCheckAll = () => {
    setServiceCk(!check);
    setPersonalInfoCk(!check);
    setProvisionCk(!check);
    setMarketingCk(!check);
  };

  // 필수 체크박스가 모두 true이면 check도 true로 변경
  useEffect(() => {
    setCheck(serviceCk && personalInfoCk && provisionCk);
  }, [serviceCk, personalInfoCk, provisionCk]);

  const JoinFunc = (e) => {
    //입력 성공 axios통신
    let body = {
      name: name,
      email: id,
      password: pw,
      marketing: marketingCk,
    };

    console.log(`회원가입데이터:${name},${id},${pw},${marketingCk}`);

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
          className="input_box"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="subtitle">이메일주소</div>
        <input
          placeholder="이메일 주소를 입력해주세요"
          className="input_box"
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          placeholder="이메일 주소를 확인합니다"
          className="input_box"
          onChange={(e) => {
            setIdCk(e.target.value);
          }}
        />

        <div className="subtitle">비밀번호</div>
        <input
          placeholder="비밀번호를 입력해주세요"
          className="input_box"
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <input
          placeholder="비밀번호를 확인합니다"
          className="input_box"
          onChange={(e) => {
            setPwCk(e.target.value);
          }}
        />

        <div className="check_list">
          <label>
            <input type="checkbox" onChange={handleCheckAll} />
            전체 동의
          </label>
          <label>
            <input
              type="checkbox"
              name="serviceCk"
              checked={serviceCk}
              onChange={handleCheckboxChange}
            />
            서비스 이용약관 동의
          </label>
          <label>
            <input
              type="checkbox"
              name="personalInfoCk"
              checked={personalInfoCk}
              onChange={handleCheckboxChange}
            />
            개인정보 수집 및 이용 동의
          </label>
          <label>
            <input
              type="checkbox"
              name="provisionCk"
              checked={provisionCk}
              onChange={handleCheckboxChange}
            />
            제3자 개인정보 제공 동의
          </label>
          <label>
            <input
              type="checkbox"
              name="marketingCk"
              checked={marketingCk}
              onChange={handleCheckboxChange}
            />
            마케팅 수신 동의
          </label>
        </div>
      </div>
      <div className="input_footer">
        <button disabled={button} onClick={JoinFunc} className="login_button">
          회원가입
        </button>
        <button className="kakao_button">카카오로 가입하기</button>
      </div>
    </div>
  );
};

export default Join;
