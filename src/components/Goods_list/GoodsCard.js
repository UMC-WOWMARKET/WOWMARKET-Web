import { useNavigate } from "react-router";
import styled from "styled-components";

const GoodsCard = ({
  id,
  projectName,
  sellerName,
  goal,
  achieved,
  endDate,
  startDate,
  imgUrl,
  univ,
  page_type,
}) => {
  const achievedPer = ((achieved / goal) * 100).toFixed(2);

  const startDateParsed = new Date(startDate);
  const endDateParsed = new Date(endDate);
  const timeDifference = endDateParsed - startDateParsed; // Difference in milliseconds
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  const navigate = useNavigate();
  let daysState = false;
  let todayState = false;

  //남은 날짜에 따른 style변경
  if (remainingDays <= 6) {
    daysState = true;
    if (remainingDays === 0) {
      todayState = true;
    }
  }

  //상세페이지 이동 함수
  const handleCardClick = (id) => {
    console.log(`${id} 굿즈 클릭`);
    navigate(`/goods/detail?page_type=${page_type}&id=${id}`);
  };

  console.log(univ);
  return (
    <GoodsList
      onClick={() => {
        handleCardClick(id);
      }}
    >
      <div>
        {daysState && !todayState && (
          <RemainingDaysHot>D - {remainingDays}</RemainingDaysHot>
        )}
        {!daysState && <RemainingDays>D - {remainingDays}</RemainingDays>}
        {todayState && <RemainingDaysHot>오늘 마감</RemainingDaysHot>}

        <img
          src={imgUrl}
          style={{
            width: "360px",
            height: "207px",
            border: "solid 2px transparent", // 테두리 스타일 추가
            borderRadius: "10px", // 테두리 둥글기 설정
          }}
        />
      </div>

      <div>
        <ProjectName>{projectName}</ProjectName>
        <AchievePer>{achievedPer}%달성</AchievePer>
        <SellerName>제작 {sellerName}</SellerName>
      </div>
    </GoodsList>
  );
};

export default GoodsCard;

const GoodsList = styled.div`
  margin-left: 44px;
  margin-right: 10px;
  margin-top: 90px;
  font-family: Pretendard;
`;

const ProjectName = styled.div`
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  color: #646464;
  margin-top: 15px;
`;

const AchievePer = styled.div`
  position: absolute;
  font-size: 15px;
  font-weight: 700;
  color: blue;
  margin-top: 45px;
  color: #4051e7a3;
`;

const SellerName = styled.div`
  float: right;
  color: #a0a0a0;
  font-size: 16px;
  font-weight: 400px;

  margin-top: 15px;
`;

const RemainingDays = styled.div`
  background-color: #4051e7a3;
  color: white;
  width: 70px;
  height: 32px;
  position: absolute;
  margin-left: 280px;
  margin-top: 163px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 3px 4px -1px rgba(0, 0, 0, 0.64);
`;
const RemainingDaysHot = styled.div`
  background-color: #e74040a3;
  color: white;
  width: 70px;
  height: 32px;
  position: absolute;
  margin-left: 280px;
  margin-top: 163px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 3px 4px -1px rgba(0, 0, 0, 0.64);
`;