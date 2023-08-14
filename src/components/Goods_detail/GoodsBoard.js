import React, { useState } from 'react';
import Intro from "./Intro"
import NoticeList from "./NoticeList"
import QuestionList from "./QuestionList"
import axios from "axios";

const GoodsBoard = () => {
	const [view, setView] = useState('default');
	const handleButtonClick = (buttonType) => {
		setView(buttonType);
	};

  return (
		<div className="BoardView">
					<button onClick={() => handleButtonClick('굿즈소개')}>굿즈소개</button>
					<button onClick={() => handleButtonClick('공지')}>공지</button>
					<button onClick={() => handleButtonClick('문의')}>문의</button>
					{view === '굿즈소개' && <Intro />}
					{view === '공지' && <NoticeList />}
					{view === '문의' && <QuestionList />}
		</div>
	);
};

export default GoodsBoard;
