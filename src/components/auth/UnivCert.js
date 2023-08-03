import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UnivCert() {
  const [univName, setUnivName] = useState("");
  const [univMail, setUnivMail] = useState("");
  const [certNum, setCertNum] = useState("");

  let body = {
    univ_name: "홍익대학교",
    univ_email: "ekdldkaa@g.hongik.ac.kr",
  };

  let code_body = {
    univ_name: "홍익대학교",
    univ_email: "ekdldkaa@g.hongik.ac.kr",
    code: 1680,
  };

  const handleChangeState = (e) => {
    setUnivName({
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleNavitgateToReturn = useCallback(() => {
    navigate("/");
  }, [navigate]);

  axios.interceptors.request.use(
    (config) => {
      // 요청 직전에 헤더를 확인하고 싶은 경우
      console.log("Request Headers:", config.headers);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const submitUnivData = (e) => {
    axios
      .post("http://localhost:8080/wowmarket/users/univCert", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const submitCertCode = (e) => {
    axios
      .post("http://localhost:8080/wowmarket/users/univCert/code", code_body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="UnivCert">
      <div className="title">학교 인증</div>

      <div className="input_body">
        <div className="subtitle">대학명</div>
        <div>
          <select className="univName" onChange={handleChangeState}>
            <option value={1}>대학명을 입력해주세요</option>
            <option value={2}>이화여자대학교</option>
            <option value={3}>홍익대학교</option>
          </select>
        </div>
      </div>

      <div className="input_tail">
        <div className="subtitle">학교 이메일</div>

        <input
          placeholder="학교 이메일을 입력해주세요"
          className="univMail"
          onChange={(e) => {
            setUnivMail(e.target.value);
          }}
        />
        <button className="univMailButton">인증번호 발송</button>

        <br />

        <input
          placeholder="인증번호를 입력해주세요"
          className="certNum"
          onChange={(e) => {
            setCertNum(e.target.value);
          }}
        />
        <button className="certNum_button" onClick={submitCertCode}>
          인증번호 확인
        </button>
      </div>

      <div className="input_footer">
        <button className="cert_button" onClick={submitUnivData}>
          인증하기
        </button>
        <button className="cert_later" onClick={handleNavitgateToReturn}>
          다음에 인증하기
        </button>
      </div>
    </div>
  );
}

export default UnivCert;
