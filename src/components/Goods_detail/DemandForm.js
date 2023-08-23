import React, { useEffect, useState } from 'react';
import '../../styles/OrderForm.css'
import styled from "styled-components";

import axios from 'axios';

//상품 컴포넌트
const SelectItem = ({ id, index, name, price, onChangecount}) => {
	const [count, setcount] = useState(0);

	const handleDecrease = () => {
		if (count > 0) {
			setcount(count - 1);
			onChangecount(id, count - 1);
		}
	};

	const handleIncrease = () => {
		setcount(count + 1);
		onChangecount(id, count + 1);
	};

	return  (
	<div className="common-box text3" style={{width:'420px', height:'60px'}}>
		<div className='item1'>{index}. {name}</div>
		<div className='item2'>{price}원</div>
		<div className='item3'>
			<div className="common-box button" onClick={handleDecrease} style={{margin:'auto 0 auto 12px'}}>-</div>
			<div className="common-box button" style={{margin:'auto 0 auto 0'}}>{count}</div>
			<div className="common-box button" onClick={handleIncrease} style={{margin:'auto 27px auto 0'}}>+</div>
		</div>
	</div>
	);
}

//주문폼 컴포넌트
const DemandForm = ({ goods_id }) => {
	// GET DATA
	//상품리스트
	const [itemList, setItemList] = useState([]);


	// POST DATA
	//상품별 수량 저장
	const [orderList, setOrderList] = useState([]);
	// 상품 선택 - 상품별 수량 저장
	const [itemQuantities, setItemQuantities] = useState({});
	//총 수량
	const totalCount = Object.values(itemQuantities).reduce((total, count) => total + count, 0);
	//총 상품 금액
	const totalPrice = itemList.reduce((total, goods) => {
		const count = itemQuantities[goods.id] || 0;
		return total + goods.price * count;
	}, 0);

	const handleAddToOrder = (demandItemId, count) => {
		const existingOrderIndex = orderList.findIndex(order => order.demandItemId === demandItemId);

		if (existingOrderIndex !== -1) {
			const updatedOrderList = [...orderList];
			updatedOrderList[existingOrderIndex].count = count;
			setOrderList(updatedOrderList);
		} else {
			setOrderList([...orderList, { demandItemId, count }]);
		}
		setItemQuantities((prevQuantities) => ({
			...prevQuantities,
			[demandItemId]: count,
		}));
	};

	const fetchData = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/demand_project/${goods_id}/item`)

			setItemList(response.data);
			console.log(response.data);

			console.log("DemandForm Get Success");
		} catch (error) {
		console.log("DemandForm GET Error", error);
	}
	}

	useEffect (() => { fetchData(); }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const postData = orderList;
		console.log(postData);

		try {
			console.log(postData);
			await axios.post(`http://www.wowmkt.kr/demand_project/${goods_id}`, postData);
			console.log('DemandForm Post Success');
		} catch(error){
			console.error('DemandForm Post Error');
			window.alert("참여폼을 제출할 수 없습니다");
		}
	}

	useEffect (() => { fetchData(); }, []);

	return (
		<div id="OrderForm">
		<div className="OrderForm">
			<h3 style={{margin:'37px 0 25px 0'}}>참여폼</h3>
			<div className='common-box' style={{width:'420px', height:'0px'}}></div>


			<div className='gray-box'
				 style={{
					width:'420px',
				 	height:'45px',
					marginTop:'32px',
					color:'#000',
					fontSize:'14px',
					backgroundColor:'#F2F2F2',
					display:'flex',
					justifyContent: 'center',
					alignItems: 'center'}}>
				정확한 수요 예측을 위해, 실제 구매를 원하는 분만 참여해주세요!
			</div>

			{/* 상품 선택 */}
			<div className='selectItem'>
				<h4>상품 선택</h4>
				<div className='flex-column'>
					{itemList.map((item, index) =>(
						<SelectItem
							key={item.id}
							id={item.id}
							name={item.name}
							price={item.price}
							index={index+1}
							onChangecount={handleAddToOrder}/>
					))}
				</div>
			</div>


			{/* 주문 정보 */}
			<div className='orderInfo'>
				<h4>수요조사 정보</h4>
				<div className='orderInfoBox'
					style={{width:'420px',
					height:'auto',
					border: '1px solid #DDDDDD '}}>
					{itemList.map((item) => (
						<div key={item.id}
						style={{width:'420px',
								height:'42px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								}}>
							<Info1>{item.name}</Info1>
							<div style={{width:'70px'}}></div>
							<Info2>{itemQuantities[item.id] || 0}개</Info2>
						</div>
					))}
				</div>
				<div >
					<div style={{
							display: 'flex',
							marginTop:'15px',
							marginBottom:'15px',
							justifyContent: 'center',
							alignItems: 'center' }}>
						<TotalSubtitle>총 상품 수량</TotalSubtitle>
						<div style={{width:'70px'}}></div>
						<TotalQuan>총 수량 {totalCount}개</TotalQuan>
					</div>
				</div>
			</div>
		</div>

		<div style={{width: '420px', heigth: '50px',marginBottom:'400px', backgroundColor:'transparent', color: 'white'}}>.</div>
		{/* 폼 제출하기 */}
		<div className='submitForm'>
			<div className='submitbutton' onClick={handleSubmit}>폼 제출하기</div>
		</div>
	</div>
	);
}

export default DemandForm;

const Info1 = styled.div`
 width: 220px;
 display: inline;
 font-weight: 400;
 font-size: 16px;
 color: #646464;
 text-align: left;
 margin-left: 20px;
`


const Info2 = styled.div`
display: inline;
width: 50px;
padding-left: 10px;
font-size: 16px;
color: #9A9A9A;
`


const Info3 = styled.div`
display: inline;
width: 100px;
font-size: 16px;
color: #9A9A9A;

`

const TotalSubtitle = styled.div`
 display: inline;
 font-size: 16px;
 color:#646464;
 color: #646464;
 margin-right: 100px;
`

const TotalQuan =styled.div`
 display: inline;
 width: 110px;
 color: #9A9A9A;
 font-size: 16px;
`

const TotalSum =styled.div`
	display: inline;
	width: 100px;
	margin-right:10px;
	color:#646464;
	font-size: 20px;
	font-weight: 600;
	`

const DelivSubtitle = styled.div`
	margin-right: 240px;
	margin-left: 20px;
	display: inline;
	color: #646464;
	font-size: 16px;

`

const DelivSum = styled.div`
	display: inline;
	color: #646464;
	font-size: 20px;
	font-weight: 600;
	margin-right: px;
`
const Line = styled.div`
	height: 2px;
	width: 420px;
	background-color: #DDDDDD;
	margin-top: 20px;
	margin-bottom: 20px;
`

const FinalSubtitle =styled.div`
	margin-right: 225px;
	margin-left: 25px;
	display: inline;
	font-size: 16px;
	color: #646464;
	align-items: flex-start;
`

const FinalSum =styled.div`
	display: inline;
	margin-right: 20px;
	color: #646464;
	font-weight: 600;
	font-size: 20px;
	width: 150px;
`

const Account = styled.div`
	margin: 20px;
	width: 80px;

`
const Bank =styled.div`
	margin: 20px 20px 20px 25px;
	width: 50px;
	text-align: left;
`
const AccountNo =styled.div`
	margin: 20px 20px 20px 0;
	width: 150px;
	text-align: left;
`
const Seller =styled.div`
	margin-right: 55px;
	margin-left: 5px;
	`

const SellerName =styled.div`
	width: 120px;
	text-align: left;
`
const Refund =styled.div`
	font-size: 16px;
	font-weight: 500;
	color: #646464;
`
