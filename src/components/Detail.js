// //상세페이지
// import React, { useState } from 'react';
// import NoticeList from './GoodsDetail/NoticeList';
// import Intro from './goods_detail/Intro';
// import Question from './GoodsDetail/QuestionList';
// import OrderForm from './goods_detail/OrderForm';

// const Detail = () => {
// 	// 더미 데이터
// 	const dummyData = {
// 		seller: '판매자 이름',
// 		projectname: '프로젝트 이름',
// 		img: '대표 이미지 URL', // URL이나 파일 경로
// 		introduce: '프로젝트 소개',
// 		startdate: new Date('2023-08-01'), // 시작 날짜
// 		enddate: new Date('2023-09-01'), // 종료 날짜
// 		goal: 100,
// 		achived: 50,
// 		participate: 20,
// 		leftdate: 30 // 남은 일 수
// 	};

// 	const achievementRate = (dummyData.achived / dummyData.goal * 100).toFixed(2);
// 	const period = `${dummyData.startdate.toLocaleDateString()}~${dummyData.enddate.toLocaleDateString()}`;

// 	const [view, setView] = useState('default');
// 	const handleButtonClick = (buttonType) => {
// 		setView(buttonType);
// 	};

// 	return (
// 		<div style={{display:'flex'}}>
// 			<div className="Left">
// 				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
// 					<h2 className="name">{dummyData.projectname}</h2>
// 					<p className="seller">판매자: {dummyData.seller}</p>
// 				</div>
// 				<img className="project-img" src={dummyData.img} alt="대표 이미지" />
// 				<p className="introduce">{dummyData.introduce}</p>
// 				<p className="period">기간: {period}</p>
// 				<div className="Detail-stats">
// 					<div className="stat-item">
// 						<p>달성율: {(dummyData.achived / dummyData.goal) * 100}%</p>
// 					</div>
// 					<div className="stat-item">
// 						<p>참여 인원: {dummyData.participate}</p>
// 					</div>
// 					<div className="stat-item">
// 						<p>남은 일 수: {dummyData.leftdate}</p>
// 					</div>
// 				</div>

// 				<div className="Post">
// 					<button onClick={() => handleButtonClick('굿즈소개')}>굿즈소개</button>
// 					<button onClick={() => handleButtonClick('공지')}>공지</button>
// 					<button onClick={() => handleButtonClick('문의')}>문의</button>
// 				</div>
// 				{view === '굿즈소개' && <Intro />}
// 				{view === '공지' && <NoticeList />}
// 				{view === '문의' && <Question />}
// 			</div>

// 			<div className='Right' style={{ flex: 1, overflowY: 'scroll', padding: '20px', maxHeight: '400px', border:'solid 0.5px'}}>
// 				<OrderForm />
// 			</div>
// 		</div>
// 	);
// }

// export default Detail;
