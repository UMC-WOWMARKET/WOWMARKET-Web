
import styled from "styled-components";

const GoodsCard = ({
  projectName,
  sellerName,
  goal,
  achieved,
  endDate,
  startDate,
  imgUrl,
  univ,
}) => {
  const achievedPer = ((achieved / goal) * 100).toFixed(2);

  const startDateParsed = new Date(startDate);
  const endDateParsed = new Date(endDate);
  const timeDifference = endDateParsed - startDateParsed; // Difference in milliseconds
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  console.log(univ);
  return (

    <GoodsList>
      <div >
      <RemainingDays>D - {remainingDays}</RemainingDays>
      <img 
        src={imgUrl}
        style={{ 
          width: "368px", 
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
  margin-left: 100px;
  margin-top: 50px;
  font-family: Pretendard;
`

const ProjectName = styled.div`
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  color: #646464;
  `

const AchievePer = styled.div`
  position: absolute;
  font-size: 15px;
  font-weight: 700;
  color: blue;
  margin-top: 30px;
  color: #4051E7A3;
`

const SellerName = styled.div`
  float: right;
  color: #A0A0A0;
  font-size: 16px;
  font-weight: 400px;
  `


const RemainingDays = styled.div`
  background-color: #4051E7A3;
  color: white;
  width: 64px;
  height: 36px;
  position: absolute;
  margin-left: 290px;
  margin-top: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`