import React, { useEffect, useState } from 'react';
import '../../styles/OrderForm.css'

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
		const postData = {
			orderList
		}
		console.log(postData);

		try {
			console.log(postData);
			await axios.post(`http://www.wowmkt.kr/demand_project/${goods_id}`, postData);
			console.log('DemandForm Post Success');
		} catch(error){
			console.error('DemandForm Post Error')
		}
	}

	useEffect (() => { fetchData(); }, []);

	return (
		<div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
		<div className="OrderForm">
			<h3 style={{margin:'37px 0 25px 0'}}>참여폼</h3>
			<div className='common-box' style={{width:'420px', height:'0px'}}></div>

			{/* 상품 선택  -> 회색 버튼 css 수정?*/}
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
				<div className='common-box text3' style={{width:'420px'}}>
					{itemList.map((item) => (
						<div key={item.id} className='flex-row'>
							<div className='item1'>{item.name}</div>
							<div className='item2'>{itemQuantities[item.id] || 0}개</div>
							<div className='item3'>{item.price * (itemQuantities[item.id] || 0)}원</div>
						</div>
					))}
				</div>
				<div className='no-box'>
					<div className='flex-row'>
						<div className='item1'>총 상품 금액</div>
						<div className='item2'>총 수량 {totalCount}개</div>
						<div className='item3'>{totalPrice}원</div>
					</div>

					<div className='common-box' style={{width:'366px', height:'0px'}}></div>

					<div>
						<div className='item1'>최종 금액</div>
						<div className='item3'>{totalPrice}원</div>
					</div>
				</div>
			</div>





			<div className='gray-box' style={{width:'420px', height:'60px', marginTop:'32px', color:'#000', fontSize:'14px'}}>
				판매자의 계좌로 최종 금액을 송금한 후 아래 내용을 작성해주세요.
			</div>


		</div>
		{/* 폼 제출하기 */}
		<div className='submitForm'>
			<div onClick={handleSubmit}>폼 제출하기</div>
		</div>
	</div>
	);
}

export default DemandForm;
