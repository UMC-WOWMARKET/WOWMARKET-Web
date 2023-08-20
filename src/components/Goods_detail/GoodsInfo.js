import axios from "axios";
import { useEffect, useState } from 'react';

const GoodsInfo = ({goods_id}) => {
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
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}`)
			const data = response.data;

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
	}

	useEffect (() => { getData(); }, []);

	const achievedRate = (achieved === 0 || goal === 0 ? 0 : (achieved / goal) * 100);

	return (
		<div className="GoodsInfo">
			<div>{category}</div>
			<div>{univ}</div>
			<div>{name}</div>
			<div>제작 {nickname}</div>
			<img src={thumbnail} style={{width:'100%'}}/>
			<div>{description}</div>
			<div>기간 {startDate} ~ {endDate}</div>
			<div>{achievedRate}% 달성</div>
			<div>{participant}명 참여</div>
		</div>
	);
};

export default GoodsInfo;
