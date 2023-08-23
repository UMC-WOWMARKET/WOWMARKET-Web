import React, { useEffect, useState } from 'react';
import '../styles/OrderForm.css'
import styled from "styled-components";

import axios from 'axios';
import { Backup } from 'aws-sdk';

//상품 컴포넌트
const SelectItem = ({ id, index, name, price, onChangeQuantity}) => {
	const [quantity, setQuantity] = useState(0);

	const handleDecrease = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
			onChangeQuantity(id, quantity - 1);
		}
	};

	const handleIncrease = () => {
		setQuantity(quantity + 1);
		onChangeQuantity(id, quantity + 1);
	};

	return  (
	<div className="common-box text3" style={{width:'420px', height:'60px'}}>
		<div className='item1'>{index}. {name}</div>
		<div className='item2'>{price}원</div>
		<div className='item3'>
			<div className="common-box button" onClick={handleDecrease} style={{margin:'auto 0 auto 12px' }}>-</div>
			<div className="quantity-button" style={{margin:'auto 0 auto 0'}}>{quantity}</div>
			<div className="common-box button" onClick={handleIncrease} style={{margin:'auto 27px auto 0'}}>+</div>
		</div>
	</div>
	);
}

//주문폼 컴포넌트
const OrderForm = ({ goods_id }) => {
	// GET DATA
	//수령 방법
	const [receiveType, setReceiveType] = useState(""); //수령방법
	const [deliveryFee, setDeliveryFee] = useState(" "); //택배배송일 때 - 택배비
	const [receiveAddress, setReceiveAddress] = useState(" "); //직접수령일 때 - 픽업장소
	//상품리스트
	const [itemList, setItemList] = useState([]);
	//판매자 계좌 정보
	const [sellerBank, setSellerBank] = useState(null);
	const [sellerAccount, setSellerAccount] = useState(null);
	const [sellerAccountHolder, setSellerAccountHolder] = useState(null);

	// POST DATA
	//배송 정보
	const [receiver, setReceiver] = useState(''); //수취인명
	const [zipcode, setZipcode] = useState(''); //우편번호
	const [address, setAddress] = useState(''); //주소
	const [detailAddress, setDetailAddress] = useState(''); //상세주소
	const [phoneNumber, setPhoneNumber] = useState(''); //전화번호
	//입금 정보
	const [depositor, setDepositor] = useState('');
	const [depositTime, setDepositTime] = useState('');
	//환불 계좌
	const [refundBank, setRefundBank] = useState('');
	const [refundAccount, setRefundAccount] = useState('');
	//배송 메세지
	const [deliveryMessage, setDeliveryMessage] = useState('미리 연락 바랍니다.');

	//상품별 수량 저장
	const [orderList, setOrderList] = useState([]);
	// 상품 선택 - 상품별 수량 저장
	const [itemQuantities, setItemQuantities] = useState({});
	//총 수량
	const totalQuantity = Object.values(itemQuantities).reduce((total, quantity) => total + quantity, 0);
	//총 상품 금액
	const totalPrice = itemList.reduce((total, goods) => {
		const quantity = itemQuantities[goods.id] || 0;
		return total + goods.price * quantity;
	}, 0);

	const handleAddToOrder = (itemId, quantity) => {
		const existingOrderIndex = orderList.findIndex(order => order.itemId === itemId);

		if (existingOrderIndex !== -1) {
			const updatedOrderList = [...orderList];
			updatedOrderList[existingOrderIndex].quantity = quantity;
			setOrderList(updatedOrderList);
		} else {
			setOrderList([...orderList, { itemId, quantity }]);
		}
		setItemQuantities((prevQuantities) => ({
			...prevQuantities,
			[itemId]: quantity,
		}));
	};
	// const searchPostcode = () => {
	// 	// 다음 우편번호 검색 API 호출
	// 	// axios.get(...)을 이용하여 API 호출하고 결과 처리
	// }

	// const fillAddressInfo = selectedAddress => {
	// 		setAddress(selectedAddress.address);
	// 		setPostcode(selectedAddress.postcode);
	// }

	const fetchData = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/item`)

			setReceiveType(response.data.receive_type);
			setDeliveryFee(response.data.delivery_fee);
			setReceiveAddress(response.data.receive_address);
			setItemList(response.data.itemResponseDtoList);
			setSellerBank(response.data.bank);
			setSellerAccount(response.data.account);
			setSellerAccountHolder(response.data.account_holder_name);

			console.log("OrderForm Get Success");
		} catch (error) {
		console.error("OrderForm GET Error", error);
	}
	}

	useEffect (() => { fetchData(); }, []);

	const handleSubmit = async (e) => {
		const postData = {
			receiver: receiver,
			zipcode: zipcode,
			address: address,
			address_detail: detailAddress,
			phone: phoneNumber,
			depositor: depositor,
			depositTime: depositTime,
			bank: refundBank,
			account: refundAccount,
			total_price: totalPrice,
			delivery_msg: deliveryMessage,
			orderRequestDtoList: orderList
		}
		try {
			console.log(postData);
			await axios.post(`http://www.wowmkt.kr/project/${goods_id}`, postData);
			console.log('OrderForm Post Success');
		} catch(error){
			console.error('OrderForm Post Error')
		}
	}

	useEffect (() => { fetchData(); }, []);

	return (
		<div id="OrderForm">
		<div className="OrderForm">
			<h3 style={{margin:'37px 0 25px 0'}}>주문폼</h3>
			<div className='common-box' style={{width:'420px', height:'0px'}}></div>

			{/* 수령방법 */}
			<div className='deliveryMethod'>
				<div className='section1'>
					<h4 style={{margin:'36px 0 16px 0'}}>수령방법</h4>
					<p className='redText' style={{margin:'39px 0 18px 9px'}}>판매자가 지정한 수령방법입니다.</p>
				</div>
				<div className='section2'>
					<div
						className={`common-box ${receiveType === 'delivery' ? 'selected' : ''}`}
						style={{ width: '200px', height : '80px'}}
					>
						<div className='text1'>택배배송</div>
						{receiveType === 'delivery' && <div className='text2'>택배비 {deliveryFee}원</div>}
					</div>
					<div
						className={`common-box ${receiveType === 'pickup' ? 'selected' : ''}`}
						style={{ width: '200px', height : '80px' }}
					>
						<div className='text1'>직접수령</div>
						{receiveType === 'pickup' && <div className='text2'>장소 {receiveAddress}</div>}
					</div>
				</div>
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
							onChangeQuantity={handleAddToOrder}/>
					))}
				</div>
			</div>


			{/* 주문 정보 */}
			<div className='orderInfo'>
				<h4>주문 정보</h4>
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
							<Info2>{itemQuantities[item.id] || 0}개</Info2>
							<Info3>{item.price * (itemQuantities[item.id] || 0)}원</Info3>
						</div>
					))}
				</div>
				<div >
					<div style={{
							display: 'flex', 
							marginTop:'15px',
							justifyContent: 'center',
							alignItems: 'center' }}>
						<TotalSubtitle>총 상품 금액</TotalSubtitle>
						<TotalQuan>총 수량 {totalQuantity}개</TotalQuan>
						<TotalSum>{totalPrice}원</TotalSum>
					</div>

					<div style={{marginTop: '15px'}}>
						<DelivSubtitle>배송비</DelivSubtitle>
						<DelivSum>{deliveryFee ? deliveryFee : 0}원</DelivSum>
					</div>

					<Line></Line>

					<div>
						<FinalSubtitle>최종 금액</FinalSubtitle>
						<FinalSum>{deliveryFee ? deliveryFee + totalPrice: totalPrice}원</FinalSum>
					</div>
				</div>
			</div>


			{/* 배송 정보 */}
			<div className='deliveryInfo'>
				<h4>배송 정보</h4>
				<div className='common-box' style={{width:'420px'}}>
					<form>
						<label htmlFor="receiver" className='label'>
								수취인명</label>
						<input className="little-box1" type="text" id="receiver" value={receiver} onChange={e => setReceiver(e.target.value)} required /><br></br>

					 <div style={{display:'flex'}}>
						<label htmlFor="zipcode" className='label'>
						우편번호 </label>
						<input className="little-box2" type="text" id="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)}></input>
						<button className='button'>우편번호 검색</button>
					 </div>
						<label className='label' htmlFor="address">주소</label>
						<input className='big-box' type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
						

						<label className='label' htmlFor="detailAddress">상세주소</label>
						<input className='big-box' type="text" id="detailAddress" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} />

						<label className='label' htmlFor="phoneNumber">전화번호</label>
						<input className='big-box' type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

						<label className='label' htmlFor="deliveryMessage">배송메시지</label>
						<select className='delivbox' 
								style={{marginBottom:'20px', fontFamily:'Pretendard', color:'#646464'}}
						id="deliveryMessage" value={deliveryMessage} onChange={e => setDeliveryMessage(e.target.value)}>
							<option value="미리 연락 바랍니다.">미리 연락 바랍니다.</option>
							<option value="부재시 경비실에 맡겨 주세요.">부재시 경비실에 맡겨 주세요.</option>
							<option value="부재시 전화 주시거나 문자 남겨 주세요.">부재시 전화 주시거나 문자 남겨 주세요.</option>
							<option value="부재시 문앞에 놓아 주세요.">부재시 문앞에 놓아 주세요.</option>
						</select>
					</form>
				</div>
			</div>


			{/* 판매자 계좌 정보 */}
			<div className='sellerAccountInfo'>
				<h4>판매자 계좌 정보</h4>
				<div className='common-box' style={{width:'420px', height:'98px',flexDirection:'column'}}>
					<div style={{display:'flex', marginRight: '50px'}}>
						<Account>입금계좌</Account>
						<Bank>{sellerBank}</Bank>
						<AccountNo>{sellerAccount}</AccountNo>
					</div>
					<div style={{display:'flex', marginRight: '150px'}}>
						<Seller>예금주</Seller>
						<SellerName>{sellerAccountHolder}</SellerName>
					</div>
				</div>
			</div>


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
				· 판매자의 계좌로 최종 금액을 송금한 후 아래 내용을 작성해주세요.
			</div>

			{/* 입금 정보 */}
			<div className='depositInfo'>
				<h4>입금 정보</h4>
				<div className='common-box' style={{width:'420px', height:'92px'}}>
					<div style={{display:'flex', alignItems:'center'}}>
						<label>입금자명</label>
						<input
							type="text"
							name="depositor"
							value={depositor}
							onChange={e => setDepositor(e.target.value)}
							style={{color:'#646464', fontFamily:'Pretendard', border: '1px solid #DDDDDD', borderRadius:'5px'}}
						/>
					</div>
					<div style={{display:'flex', alignItems:'center'}}>
						<label>입금시간</label>
						<input
							type="text"
							name="depositTime"
							value={depositTime}
							onChange={e => setDepositTime(e.target.value)}
							style={{color:'#646464', fontFamily:'Pretendard', border: '1px solid #DDDDDD', borderRadius:'5px'}}
						/>
					</div>
				</div>
			</div>

			{/* 환불 계좌 */}
			<div className='refundAccount'  style={{}}>
				<div style={{display:'flex', alignItems:'center'}}>
					<Refund>환불 계좌</Refund>
				</div>
				<div>
					<input
						type="text"
						name="refundBank"
						value={refundBank}
						onChange={e => setRefundBank(e.target.value)}
						style={{width:'70px', height:'22px', marginLeft:'20px', fontFamily:'Pretendard', color:'#646464'}}
						className='common-input'
					/>
					<input
						type="text"
						name="refundAccount"
						value={refundAccount}
						onChange={e => setRefundAccount(e.target.value)}
						style={{width:'144px', height:'22px', marginLeft:'4px',  fontFamily:'Pretendard', color:'#646464'}}
						className='common-input'
					/>
				</div>
			</div>
			<div className='redText' style={{margin:'10px 54px 30px 0', fontSize: '12px'}}>환불이 필요한 경우 입력해주신 계좌로 진행됩니다.</div>
		</div>
		

		<div style={{width: '420px', heigth: '50px',marginBottom:'400px', backgroundColor:'transparent', color: 'white'}}>.</div>
		{/* 폼 제출하기 */}
		<div className='submitForm'>
			<div className='submitbutton' onClick={handleSubmit}>폼 제출하기</div>
		</div>
		
	</div>
	);
}

export default OrderForm;


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