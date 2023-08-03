import { useEffect, useState, useCallback,useRef} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const ResetPw=()=>{
    
    const [button, setButton] = useState(true);

    const [mailId,setMailId]=useState("");

    const navigate = useNavigate();


    const handleNavigateToTempPw = useCallback(() => {
        navigate("/users/TempPw");
      }, [navigate]);





    return(
        <div className="ResetPw">
            <div className="title">비밀번호 재설정</div>

            <div className="input_body">
               <div className="subtitle">이메일 주소</div>
               <div>
                <input 
                  placeholder="가입하신 이메일 주소를 입력해주세요"
                  name="address"
                  className="address"
                  value={mailId}
                  onChange={(e) => {
                    setMailId(e.target.value);
                  }}
                 />
                </div>
            </div>

            <div className="temp_pw">
               <button className="temp_pw_button" onClick={handleNavigateToTempPw}>
               임시 비밀번호 받기</button>
            </div>

            <div className="tail">이메일로 전송된 링크를 통해 임시 비밀번호를 확인해주세요.
            </div>
        </div>
        

    );
};

export default ResetPw;