import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Intro from "./Board_Intro"
import NoticeList from "./Board_Notice";
import QuestionList from "./Board_Question";
import '../../styles/OrderForm.css';
import '../../styles/GoodsBoard.css';

const GoodsBoard = ({ goods_id }) => {
	const [searchParams] = useSearchParams();
  const page_type = searchParams.get("page_type");

	const [view, setView] = useState('굿즈소개');
	const handleButtonClick = (buttonType) => {
		setView(buttonType);
	};

  return (
		<div>
			<div className="BoardView" style={{display:'flex', justifyContent:'space-around'}}>
				<div onClick={() => handleButtonClick('굿즈소개')} className={view === '굿즈소개' ? 'selected' : ''}>
					굿즈소개
				</div>

				{page_type === 'selling' &&
					<div onClick={() => handleButtonClick('공지')} className={view === '공지' ? 'selected' : ''}>
						공지
					</div>
				}

				{page_type === 'selling' &&
					<div onClick={() => handleButtonClick('문의')} className={view === '문의' ? 'selected' : ''}>
						문의
					</div>
				}
			</div>

			<div className='common-box' style={{margin:'18px 0 38px 0', width:'600px'}}></div>

			<div className='BoardContent' style={{fontSize:'20px', fontWeight:'400', color:'#646464'}}>
				{view === '굿즈소개' && <Intro goods_id={goods_id}/>}
				{view === '공지' && <NoticeList goods_id={goods_id}/>}
				{view === '문의' && <QuestionList goods_id={goods_id}/>}
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
