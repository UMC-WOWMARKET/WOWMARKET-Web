import { useParams } from "react-router-dom";

const MyPage = () => {
  /*
{
userid: Long
name: string
email: string
}
*/
  //axios get해와서 유저 정보 받기
  return (
    <div className="MyPage">
      <div className="navigation_bar">Navigation</div>
      <div>Content</div>
    </div>
  );
};

export default MyPage;
