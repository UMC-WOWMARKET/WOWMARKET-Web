import React, { useState } from 'react';
import Intro from "./Board_Intro"
import NoticeList from "./Board_Notice"
import QuestionList from "./Board_Question"
import axios from "axios";

const GoodsBoard = ({ goods_id }) => {
	const [view, setView] = useState('굿즈소개');
	const handleButtonClick = (buttonType) => {
		setView(buttonType);
	};

  return (
		<div className="BoardView">
					<div onClick={() => handleButtonClick('굿즈소개')}>굿즈소개</div><br></br>
					<div onClick={() => handleButtonClick('공지')}>공지</div><br></br>
					<div onClick={() => handleButtonClick('문의')}>문의</div><br></br>
					<div className='BoardContent'>
						{view === '굿즈소개' && <Intro goods_id={goods_id}/>}
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
//   width: 80%;
//   margin: 20px auto;
// }
