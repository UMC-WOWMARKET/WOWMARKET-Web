import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const TempPw=()=>{
    const [idRe, setIdRe]=useState("");




    return (
        <div className="TempPw">
            <div className="TempPw"> 비밀번호 재설정 </div>
            <div className="input body">
                <div className="subtitle">이메일 주소</div>
                <input
                placeholder="wow1234@email.com"
                className="input_box"
                onChange={(e)=>{
                    setIdRe(e.target.value);
                 } }
                />

            </div>
  
        </div>

    );






};

export default TempPw;