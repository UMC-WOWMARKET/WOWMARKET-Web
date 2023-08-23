import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UnivCert() {
  const [univName, setUnivName] = useState("");
  const [univMail, setUnivMail] = useState("");
  const [certNum, setCertNum] = useState("");

  const selectUnivNameHandler = (e) => {
    setUnivName(e.currentTarget.value);
  };

  //인증가능대학 하드코딩
  const dummyOptions = [
    { key: "가천대학교", value: "가천대학교" },
    { key: "가톨릭대학교", value: "가톨릭대학교" },
    { key: "강원대학교", value: "강원대학교" },
    { key: "건국대학교", value: "건국대학교" },
    { key: "건국대학교(글로컬)", value: "건국대학교(글로컬)" },
    { key: "경기과학기술대학교", value: "경기과학기술대학교" },
    { key: "경기대학교", value: "경기대학교" },
    { key: "경남대학교", value: "경남대학교" },
    { key: "경남정보대학교", value: "경남정보대학교" },
    { key: "경복대학교", value: "경복대학교" },
    { key: "경북대학교", value: "경북대학교" },
    { key: "경상국립대학교", value: "경상국립대학교" },
    { key: "경성대학교", value: "경성대학교" },
    { key: "경인여자대학교", value: "경인여자대학교" },
    { key: "경희대학교", value: "경희대학교" },
    { key: "경희사이버대학교", value: "경희사이버대학교" },
    { key: "계명대학교", value: "계명대학교" },
    { key: "계명문화대학교", value: "계명문화대학교" },
    { key: "계원예술대학교", value: "계원예술대학교" },
    { key: "고려대학교", value: "고려대학교" },
    { key: "고려대학교 세종캠퍼스", value: "고려대학교 세종캠퍼스" },
    { key: "공주대학교", value: "공주대학교" },
    { key: "광운대학교", value: "광운대학교" },
    { key: "국민대학교", value: "국민대학교" },
    { key: "남서울대학교", value: "남서울대학교" },
    { key: "단국대학교", value: "단국대학교" },
    { key: "대구가톨릭대학교", value: "대구가톨릭대학교" },
    { key: "대구대학교", value: "대구대학교" },
    { key: "대구보건대학교", value: "대구보건대학교" },
    { key: "대림대학교", value: "대림대학교" },
    { key: "대전대학교", value: "대전대학교" },
    { key: "대전보건대학교", value: "대전보건대학교" },
    { key: "덕성여자대학교", value: "덕성여자대학교" },
    { key: "동국대학교", value: "동국대학교" },
    { key: "동국대학교(경주)", value: "동국대학교(경주)" },
    { key: "동덕여자대학교", value: "동덕여자대학교" },
    { key: "동서대학교", value: "동서대학교" },
    { key: "동서울대학교", value: "동서울대학교" },
    { key: "동아대학교", value: "동아대학교" },
    { key: "동양미래대학교", value: "동양미래대학교" },
    { key: "동의과학대학교", value: "동의과학대학교" },
    { key: "동의대학교", value: "동의대학교" },
    { key: "마산대학교", value: "마산대학교" },
    { key: "명지대학교 자연캠퍼스", value: "명지대학교 자연캠퍼스" },
    { key: "명지전문대학", value: "명지전문대학" },
    { key: "배재대학교", value: "배재대학교" },
    { key: "백석대학교", value: "백석대학교" },
    { key: "백석문화대학교", value: "백석문화대학교" },
    { key: "부경대학교", value: "부경대학교" },
    { key: "부산대학교", value: "부산대학교" },
    { key: "부천대학교", value: "부천대학교" },
    { key: "삼육대학교", value: "삼육대학교" },
    { key: "상명대학교", value: "상명대학교" },
    { key: "상지대학교", value: "상지대학교" },
    { key: "서강대학교", value: "서강대학교" },
    { key: "서경대학교", value: "서경대학교" },
    { key: "서영대학교", value: "서영대학교" },
    { key: "서울과학기술대학교", value: "서울과학기술대학교" },
    { key: "서울대학교", value: "서울대학교" },
    { key: "서울디지털대학교", value: "서울디지털대학교" },
    { key: "서울사이버대학교", value: "서울사이버대학교" },
    { key: "서울시립대학교", value: "서울시립대학교" },
    { key: "서울여자대학교", value: "서울여자대학교" },
    { key: "서울예술대학교", value: "서울예술대학교" },
    { key: "서일대학교", value: "서일대학교" },
    { key: "선문대학교", value: "선문대학교" },
    { key: "성균관대학교", value: "성균관대학교" },
    { key: "성신여자대학교", value: "성신여자대학교" },
    { key: "세종대학교", value: "세종대학교" },
    { key: "세종사이버대학교", value: "세종사이버대학교" },
    { key: "수원과학대학교", value: "수원과학대학교" },
    { key: "수원대학교", value: "수원대학교" },
    { key: "숙명여자대학교", value: "숙명여자대학교" },
    { key: "순천향대학교", value: "순천향대학교" },
    { key: "숭실대학교", value: "숭실대학교" },
    { key: "신구대학교", value: "신구대학교" },
    { key: "아주대학교", value: "아주대학교" },
    { key: "연성대학교", value: "연성대학교" },
    { key: "연세대학교", value: "연세대학교" },
    { key: "영남대학교", value: "영남대학교" },
    { key: "영남이공대학교", value: "영남이공대학교" },
    { key: "영진전문대학교", value: "영진전문대학교" },
    { key: "	오산대학교	", value:"	오산대학교	"},
    { key: "	우송대학교(본교)	", value:"	우송대학교(본교)	"},
    { key: "	울산대학교	", value:"	울산대학교	"},
    { key: "	원광대학교	", value:"	원광대학교	"},
    { key: "	유한대학교	", value:"	유한대학교	"},
    { key: "	이화여자대학교	", value:"	이화여자대학교	"},
    { key: "	인덕대학교	", value:"	인덕대학교	"},
    { key: "	인제대학교	", value:"	인제대학교	"},
    { key: "	인천대학교	", value:"	인천대학교	"},
    { key: "	인하공업전문대학	", value:"	인하공업전문대학	"},
    { key: "	인하대학교	", value:"	인하대학교	"},
    { key: "	장안대학교	", value:"	장안대학교	"},
    { key: "	전남대학교	", value:"	전남대학교	"},
    { key: "	전북대학교	", value:"	전북대학교	"},
    { key: "	전주대학교	", value:"	전주대학교	"},
    { key: "	제주대학교	", value:"	제주대학교	"},
    { key: "	조선대학교	", value:"	조선대학교	"},
    { key: "	중부대학교	", value:"	중부대학교	"},
    { key: "	중앙대학교	", value:"	중앙대학교	"},
    { key: "	중앙대학교	", value:"	중앙대학교	"},
    { key: "	청주대학교	", value:"	청주대학교	"},
    { key: "	충남대학교	", value:"	충남대학교	"},
    { key: "	충북대학교	", value:"	충북대학교	"},
    { key: "	한국공학대학교	", value:"	한국공학대학교	"},
    { key: "	한국교통대학교	", value:"	한국교통대학교	"},
    { key: "	한국방송통신대학교	", value:"	한국방송통신대학교	"},
    { key: "	한국외국어대학교	", value:"	한국외국어대학교	"},
    { key: "	한국항공대학교	", value:"	한국항공대학교	"},
    { key: "	한남대학교	", value:"	한남대학교	"},
    { key: "	한밭대학교	", value:"	한밭대학교	"},
    { key: "	한성대학교	", value:"	한성대학교	"},
    { key: "	한양대학교	", value:"	한양대학교	"},
    { key: "	한양대학교(ERICA)	", value:"	한양대학교(ERICA)	"},
    { key: "	한양사이버대학교	", value:"	한양사이버대학교	"},
    { key: "	한양여자대학교	", value:"	한양여자대학교	"},
    { key: "	호서대학교	", value:"	호서대학교	"},
    { key: "	홍익대학교	", value:"	홍익대학교	"},


  ];

  const navigate = useNavigate();

  const handleNavitgateToReturn = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const submitUnivData = (e) => {
    let body = {
      univ_name: univName,
      univ_email: univMail,
    };
    console.log(`${univName},${univMail}`);

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    axios
      .post("https://www.wowmkt.kr/users/univCert", body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("학교인증코드 발송 성공!");
        } else {
          alert("학교인증코드 발송 실패! 이메일 주소를 확인하세요");
        }
      })
      .catch((err) => {
        alert("학교인증코드 발송 실패! 이메일 주소를 확인하세요");
      });
  };

  const submitCertCode = (e) => {
    let code_body = {
      univ_name: univName,
      univ_email: univMail,
      code: certNum,
    };
    console.log(`인증번호 확인 데이터:${code_body}`);

    axios
      .post("https://www.wowmkt.kr/users/univCert/code", code_body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert("학교인증 성공!");
          localStorage.setItem("univCert", univName);
        } else {
          alert("학교인증 실패! 인증코드를 확인하세요");
        }
      })
      .catch((err) => {
        alert("학교인증 실패! 인증코드를 확인하세요");
      });
  };

  return (
    <div className="UnivCert">
      <div className="title">학교 인증</div>

      <div className="input_body">
        <div className="subtitle1">대학명</div>
        <select
          className="input_box"
          onChange={selectUnivNameHandler}
          value={univName}
        >
          {dummyOptions.map((item, index) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <div className="subtitle2">학교 이메일</div>
        <div className="input_body_small">
          <input
            placeholder="학교 이메일을 입력해주세요"
            className="input_box_small"
            onChange={(e) => {
              setUnivMail(e.target.value);
            }}
          />
          <button className="small_but1" onClick={submitUnivData}>
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
          <button className="small_but2" onClick={submitCertCode}>
            인증번호 확인
          </button>
        </div>
      </div>

      <div className="input_footer">
        <button className="navigation" onClick={handleNavitgateToReturn}>
          >다음에 인증하기
        </button>
      </div>
    </div>
  );
}

export default UnivCert;
