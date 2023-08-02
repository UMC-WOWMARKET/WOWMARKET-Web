import Login from "../components/auth/Login";
import Join from "../components/auth/Join";
import ResetPw from "../components/auth/ResetPw";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const Users = () => {
  const { page_type } = useParams();

  console.log(`${page_type}렌더링`);

  return (
    <div className="Users">
      {page_type === "login" && <Login />}
      {page_type === "join" && <Join />}
      {page_type === "resetPw" && <ResetPw />}
    </div>
  );
};

export default Users;
