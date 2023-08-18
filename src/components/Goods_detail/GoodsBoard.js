import React, { useState } from 'react';
import Intro from "./Board_Intro"
import NoticeList from "./Board_Notice"
import QuestionList from "./Board_Question"
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
					<div className='BoardContent'>
						{view === '굿즈소개' && <Intro />}
						{view === '공지' && <NoticeList />}
						{view === '문의' && <QuestionList />}
					</div>
		</div>
	);
};

export default GoodsBoard;


// .BoardView {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }

// .BoardContent {
//   width: 80%; /* 조절하고자 하는 크기를 설정하세요 */
//   margin: 20px auto;
// }
