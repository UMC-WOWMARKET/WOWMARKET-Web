import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UnivCert() {
  const [univName, setUnivName] = useState("");
  const [univMail, setUnivMail] = useState("");
  const [certNum, setCertNum] = useState("");

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
    const body = {
      univ_name: univName,
      univ_email: univMail,
    };
    console.log("Submit Univ Data:", body);
    axios
      .post("http://localhost:8080/wowmarket/users/univCert/code", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const submitCertCode = (e) => {
    const code_body = {
      univ_name: univName,
      univ_email: univMail,
      code: certNum,
    };
    axios
      .post("http://localhost:8080/wowmarket/users/univCert", code_body)
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
        <select
          className="input_box"
          onChange={(e) => {
            setUnivName(e.target.value);
          }}
        >
          <option value={1}>대학명을 입력해주세요</option>
          <option value={2}>이화여자대학교</option>
          <option value={3}>홍익대학교</option>
        </select>
        <div className="subtitle">학교 이메일</div>
        <div className="input_body_small">
          <input
            placeholder="학교 이메일을 입력해주세요"
            className="input_box_small"
            onChange={(e) => {
              setUnivMail(e.target.value);
            }}
          />
          <button className="small_but" onClick={submitUnivData}>
            인증번호 발송
          </button>
        </div>

        <div className="input_body_small">
          <input
            placeholder="인증번호를 입력해주세요"
            className="input_box_small"
            onChange={(e) => {
              setCertNum(e.target.value);
            }}
          />
          <button className="small_but" onClick={submitCertCode}>
            인증번호 확인
          </button>
        </div>
      </div>

      <div className="input_footer">
        <button className="login_button" onClick={submitUnivData}>
          인증하기
        </button>
        <button className="navigation" onClick={handleNavitgateToReturn}>
          다음에 인증하기
        </button>
      </div>
    </div>
  );
}

export default UnivCert;
