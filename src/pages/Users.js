import Login from "../components/auth/Login";
import Join from "../components/auth/Join";
import { useNavigate, useParams } from "react-router-dom";
import ResetPw from "../components/auth/ResetPw";

const Users = () => {
  const { page_type } = useParams();

  return (
    <div className="Users">
      <h2>로그인/회원가입</h2>

      {page_type === "login" && <Login />}
      {page_type === "join" && <Join />}
      {page_type === "reset_pw" && <ResetPw />}
    </div>
  );
};

export default Users;
