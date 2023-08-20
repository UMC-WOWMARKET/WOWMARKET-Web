import React, { useEffect, useState } from 'react';
import '../styles/OrderForm.css'
import axios from 'axios';

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
		<span style={{marginLeft:'22px'}}>{index}. {name} ---- </span>
		<span>{price}원</span>
		<div className="common-box button" onClick={handleDecrease} style={{margin:'auto 0 auto 12px'}}>-</div>
		<div className="common-box button" style={{margin:'auto 0 auto 0'}}>{quantity}</div>
		<div className="common-box button" onClick={handleIncrease} style={{margin:'auto 27px auto 0'}}>+</div>
	</div>
	);
}

//주문폼 컴포넌트
const OrderForm = ({ goods_id }) => {
	// GET DATA
	//수령 방법
	const [receiveType, setReceiveType] = useState(""); //수령방법
	const [deliveryFee, setDeliveryFee] = useState(); //택배배송일 때 - 택배비
	const [receiveAddress, setReceiveAddress] = useState(null); //직접수령일 때 - 픽업장소
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
	//우선 id를 인덱스로 하여 수량 저장했는데, 가능할 지 모르겠음 ->.수정하자
	// const handleGoodsQuantityChange = (goodsId, newQuantity) => {
	// 	setitemQuantities((prevQuantities) => ({
	// 		...prevQuantities,
	// 		[goodsId]: newQuantity,
	// 	}));
	// };
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
			setItemList(response.data.itemResponseDtoList);
			setSellerBank(response.data.bank);
			setSellerAccount(response.data.account);
			setSellerAccountHolder(response.data.account_holder_name);
			console.log("OrderForm Get Success");
		} catch (error) {
		console.log("OrderForm GET Error", error);
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
						style={{ width: '200px', height : '80px' }}
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
							onChangeQuantity={handleAddToOrder}/>
					))}
				</div>
			</div>


			{/* 주문 정보 */}
			<div className='orderInfo'>
				<h4>주문 정보</h4>
				<div className='common-box text3' style={{width:'420px'}}>
					{itemList.map((item) => (
						<div key={item.id} className='flex-row'>
							<span>{item.name} --- </span>
							<span>{itemQuantities[item.id] || 0}개---</span>
							<span>{item.price * (itemQuantities[item.id] || 0)}원</span>
						</div>
					))}
				</div>
				<div className='no-box'>
					<div>
						<span>총 상품 금액 --</span>
						<span>총 수량 {totalQuantity}개 -- </span>
						<span>{totalPrice}원</span>
					</div>
					<div>
						<span>배송비</span>
						<span>{deliveryFee ? deliveryFee : 0}원</span>
					</div>
					<div className='common-box' style={{width:'366px', height:'0px'}}></div>
					<div>
						<span>최종 금액</span>
						<span>{deliveryFee ? deliveryFee + totalPrice: totalPrice}원</span>
					</div>
				</div>
			</div>


			{/* 배송 정보 */}
			<div className='deliveryInfo'>
				<h4>배송 정보</h4>
				<div className='common-box'>
					<form>
						<label htmlFor="receiver">수취인명</label>
						<input type="text" id="receiver" value={receiver} onChange={e => setReceiver(e.target.value)} required /><br></br>

						<label htmlFor="zipcode">우편번호</label>
						<input type="text" id="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} />
						{/* <button type="button" onClick={searchPostcode}>우편번호 검색</button>*/}<br /><br />

						<label htmlFor="address">주소</label>
						<input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
						<br /><br />

						<label htmlFor="detailAddress">상세주소</label>
						<input type="text" id="detailAddress" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} /><br /><br />

						<label htmlFor="phoneNumber">전화번호</label>
						<input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /><br /><br />

						<label htmlFor="deliveryMessage">배송메시지</label>
						<select id="deliveryMessage" value={deliveryMessage} onChange={e => setDeliveryMessage(e.target.value)}>
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
				<div className='common-box'>
					입금계좌 {sellerBank} {sellerAccount} <br></br>
					예금주 {sellerAccountHolder}
				</div>
			</div>


			<div className='gray-box'>
				판매자의 계좌로 최종 금액을 송금한 후 아래 내용을 작성해주세요.
			</div>

			{/* 입금 정보 */}
			<div className='depositInfo'>
				<h4>입금 정보</h4>
				<div className='common-box'>
					<form>
						<div>
							<label>입금자명</label>
							<input
								type="text"
								name="depositor"
								value={depositor}
								onChange={e => setDepositor(e.target.value)}
							/>
						</div>
						<div>
							<label>입금시간</label>
							<input
								type="text"
								name="depositTime"
								value={depositTime}
								onChange={e => setDepositTime(e.target.value)}
							/>
						</div>
					</form>
				</div>
			</div>

			{/* 환불 계좌 */}
			<div className='refundAccount'>
				<h4>환불 계좌</h4>
				<input
					type="text"
					name="refundBank"
					value={refundBank}
					onChange={e => setRefundBank(e.target.value)}
				/>
				<input
					type="text"
					name="refundAccount"
					value={refundAccount}
					onChange={e => setRefundAccount(e.target.value)}
				/>
			</div>

			{/* 폼 제출하기 */}
			<div className='submitForm'>
        <button onClick={handleSubmit}>폼 제출하기</button>
      </div>
		</div>
	);
}

export default OrderForm;
