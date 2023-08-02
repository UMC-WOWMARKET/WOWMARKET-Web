import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const TempPw=()=>{
    const [idRe, setIdRe]=useState("");
    const [pw, setPw]=useState("");
    const [pwCk, setPwCk]=useState("");

    const navigate=useNavigate();

    const handleNavigateToReset=useCallback(()=>{
        navigate("/pages/Home");
    },[navigate]);

    const [button, setButton] = useState(true);

    useEffect(()=>{
        idRe.includes("@")&&
        pw.length>=5 &&
        pw === pwCk
          ? setButton(false)
          : setButton(true);
        
    }, [idRe,pw,pwCk]);





    return (
        <div className="TempPw">
            <div className="title"> 비밀번호 재설정 </div>

            <div className="input_body">
                <div className="subtitle">이메일 주소</div>
                <input
                   placeholder="wow1234@email.com"
                   className="input_box"
                   onChange={(e)=>{
                      setIdRe(e.target.value);
                    } }
                />
            </div>

            <div className="input_tail">
                <div className="subtitle">비밀번호</div>
                <input
                   placeholder="새로운 비밀번호를 입력해주세요"
                   className="input_box"
                   onChange={(e)=>{
                      setPw(e.target.value);
                   }}
                />
                <br/>
                <input
                   placeholder="새로운 비밀번호를 확입합니다"
                   className="input_check"
                   onChange={(e)=>{
                       setPwCk(e.target.value);
                   }}
                />
            </div>

            <div>
                <button className="resetPw" disabled={button} onClick={handleNavigateToReset}>
                    비밀번호 재설정하기 
                </button>
            </div>
  
        </div>

    );

};

export default TempPw;