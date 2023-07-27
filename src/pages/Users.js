import Login from "../components/auth/Login";
import Join from "../components/auth/Join";

const Users = () => {
  return (
    <div className="Users">
      <h2>로그인/회원가입</h2>
      <Login />
      <br />
      <Join />
    </div>
  );
};

export default Users;
