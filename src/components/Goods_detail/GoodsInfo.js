import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../styles/GoodsInfo.css";

const GoodsInfo = ({ goods_id }) => {
  const [searchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");

  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [univ, setUniv] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participant, setParticipant] = useState(0);
  const [achieved, setAchieved] = useState(0);
  const [goal, setGoal] = useState(0);

  const getData = async () => {
    try {
      let response;
      if (page_type === "selling") {
        response = await axios.get(`https://www.wowmkt.kr/project/${goods_id}`);
      } else {
        response = await axios.get(
          `https://www.wowmkt.kr/demand_project/${goods_id}`
        );
      }
      const data = response.data;
      console.log(data);
      setThumbnail(data.thumbnail);
      setCategory(data.category);
      setName(data.name);
      setUniv(data.univ);
      setNickname(data.nickname);
      setDescription(data.description);
      setStartDate(data.start_date);
      setEndDate(data.end_date);
      setParticipant(data.participant_number);
      setAchieved(data.achieved);
      setGoal(data.goal);

      console.log("GoodsInfo GET Success");
    } catch (error) {
      console.log("GoodsInfo GET Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const achievedRate =
    achieved === 0 || goal === 0
      ? "0.00"
      : ((achieved / goal) * 100).toFixed(2);
  const startDateParsed = new Date(startDate);
  const endDateParsed = new Date(endDate);
  const timeDifference = endDateParsed - startDateParsed; // Difference in milliseconds
  const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  return (
    <div className="GoodsInfo" style={{fontFamily:'Pretendard'}}>
      <div className="line" style={{ marginBottom: "12px" }}>
        <div
          className="category"
          style={{
            color: "#646464",
            fontSize: "20px",
            fontWeight: "400",
            marginRight: "10px",
          }}
        >
          {category}
        </div>
        <div
          className="univ"
          style={{ color: "#A0A0A0", fontSize: "20px", fontWeight: "400" }}
        >
          {univ}
        </div>
      </div>

      <div
        className="line"
        style={{ justifyContent: "space-between", marginBottom: "16px" }}
      >
        <div
          className="name"
          style={{ color: "#646464", fontSize: "28px", fontWeight: "600" }}
        >
          {name}
        </div>
        <div
          className="nickname"
          style={{ marginRight: '15px', color: "#A0A0A0", fontSize: "16px", fontWeight: "400" }}
        >
          제작 {nickname}
        </div>
      </div>

      <img
        src={thumbnail}
        style={{ width: "100%", borderRadius: "10px", marginBottom: "24px" }}
      />

      <div className="line">
        <div
          style={{
            color: "#646464",
            fontSize: "20px",
            fontWeight: "400",
            marginBottom: "12px",
          }}
        >
          {description}
        </div>
      </div>

      <div className="line">
        <div
          style={{
            color: "#A0A0A0",
            fontSize: "20px",
            fontWeight: "400",
            marginBottom: "36px",
          }}
        >
          기간 {startDate} ~ {endDate}
        </div>
      </div>

      <div
        className="line"
        style={{ justifyContent: "space-around", marginBottom: "80px" }}
      >
        <div className="line">
          
          <div className="text1" style={{ color: "rgba(64, 81, 231, 0.64)" }}>
            {achievedRate}
          </div>
          <div className="text2" style={{ color: "rgba(64, 81, 231, 0.64)" }}>
            % 달성
          </div>
          <div style={{ color: "#646464", fontSize: '40px' }}>&nbsp; &nbsp;&nbsp;&nbsp;ㅣ</div>
        </div>
        <div className="line">
          <div className="text1" style={{fontWeight:'400', color: "#646464" }}>
            {participant}
          </div>
          <div className="text2" style={{  color: "#646464" }}>
            명 참여
          </div>
          <div style={{ color: "#646464", fontSize: '40px' }}>&nbsp; &nbsp;&nbsp;&nbsp;ㅣ</div>
        </div>
        <div className="line">
          <div className="text1" style={{ color: "#646464" }}>
            {remainingDays}
          </div>
          <div className="text2" style={{ color: "#646464" }}>
            일 남음
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoodsInfo;
