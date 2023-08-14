import React, { useState } from 'react';
import dummy from '../db/data.json';

const SelectGoods = ({ id, name, price, onChangeQuantity}) => {
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
	<div className="goods-container">
		<span>{name} {price}원</span>
		<button onClick={handleDecrease}>-</button>
		<span>{quantity}</span>
		<button onClick={handleIncrease}>+</button>
	</div>
	);
}

const OrderForm = () => {
	const [selectedMethod, setSelectedMethod] = useState(null); //수령 방법
	const [goodsQuantities, setGoodsQuantities] = useState({}); // 상품 선택 - 수량 저장
	const [recipientName, setRecipientName] = useState(''); //배송 정보 - 수취인명
	const [postcode, setPostcode] = useState(''); //배송 정보 - 우편번호
	const [address, setAddress] = useState(''); //배송정보 - 주소
	const [detailAddress, setDetailAddress] = useState(''); //배송정보 - 상세주소
	const [phoneNumber, setPhoneNumber] = useState(''); //배송정보 - 전화번호

	const handleMethodSelection = (methodId) => {
		setSelectedMethod(methodId);
		console.log(`Selected method: ${methodId}`);
	};

	const selectedDeliveryMethod = dummy.deliveryMethod.find(method => method.id === selectedMethod);

	const handleGoodsQuantityChange = (goodsId, newQuantity) => {
		setGoodsQuantities((prevQuantities) => ({
			...prevQuantities,
			[goodsId]: newQuantity,
		}));
	};

	const totalPrice = dummy.goodsList.reduce((total, goods) => {
		const quantity = goodsQuantities[goods.id] || 0;
		return total + goods.price * quantity;
	}, 0);

	const totalQuantity = Object.values(goodsQuantities).reduce((total, quantity) => total + quantity, 0);

	const searchPostcode = () => {
		// 다음 우편번호 검색 API 호출
		// axios.get(...)을 이용하여 API 호출하고 결과 처리
	}

	const fillAddressInfo = selectedAddress => {
			setAddress(selectedAddress.address);
			setPostcode(selectedAddress.postcode);
	}

	const [depositData, setDepositData] = useState({
    depositorName: '',
    depositTime: '',
		depositBankName:'',
		depositAccount: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDepositData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

	return (
		<div className="OrderForm">
			<h3>주문폼</h3>

			<div className='deliveryMethod'>
				<h4>수령방법</h4> <p>판매자가 지정한 수령방법입니다.</p>
				{dummy.deliveryMethod.map((method) => (
					<div
						key={method.id}
						className={`delivery-method ${selectedMethod === method.id ? 'selected' : ''}`}
						onClick={() => handleMethodSelection(method.id)}
						style={{ color: selectedMethod === method.id ? 'red' : 'inherit' }}
					>
						{method.name}
					</div>
				))}
			</div>

			<div className='selectGoods'>
				<h4>상품 선택</h4>
				{dummy.goodsList.map((goods) =>(
					<SelectGoods key={goods.id} id={goods.id} name={goods.name} price={goods.price} onChangeQuantity={handleGoodsQuantityChange}/>
				))}
			</div>

			<div>
				<h4>주문 정보</h4>
				{dummy.goodsList.map((goods) => (
					<div key={goods.id}>
						{goods.name} {goodsQuantities[goods.id] || 0}개 {goods.price * (goodsQuantities[goods.id] || 0)}원
					</div>
				))}
				<div>
					총 상품 금액 | 총 수량 {totalQuantity}개 | {totalPrice}원
				</div>
				<div>
				배송비 {selectedDeliveryMethod ? selectedDeliveryMethod.cost : 0}원
				</div>
				최종 금액 {selectedDeliveryMethod ? selectedDeliveryMethod.cost + totalPrice: totalPrice}원
			</div>

			<div>
				<h4>배송 정보</h4>
				<form>
					<label htmlFor="recipientName">수취인명</label>
					<input type="text" id="recipientName" value={recipientName} onChange={e => setRecipientName(e.target.value)} required /><br /><br />

					<label htmlFor="postcode">우편번호</label>
					<input type="text" id="postcode" value={postcode} readOnly />
					<button type="button" onClick={searchPostcode}>우편번호 검색</button><br /><br />

					<label htmlFor="address">주소</label>
					<input type="text" id="address" value={address} readOnly /><br /><br />

					<label htmlFor="detailAddress">상세주소</label>
					<input type="text" id="detailAddress" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} /><br /><br />

					<label htmlFor="phoneNumber">전화번호</label>
					<input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /><br /><br />
				</form>
			</div>

			<div>
				<h4>판매자 계좌 정보</h4>
				입금계좌 {dummy.accountInfo[0].account} <br></br>
				예금주 {dummy.accountInfo[0].holder}
			</div>

			<div>
				<h4>입금 정보</h4>
				<form>
					<div>
						<label>입금자명</label>
						<input
							type="text"
							name="depositorName"
							value={depositData.depositorName}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label>입금시간</label>
						<input
							type="text"
							name="depositTime"
							value={depositData.depositTime}
							onChange={handleInputChange}
						/>
					</div>
			</form>
			</div>

			<div>
				<h4>환불 계좌</h4>
				<input
					type="text"
					name="depositBankName"
					value={depositData.depositBankName}
					onChange={handleInputChange}
				/>
				<input
					type="text"
					name="depositAccount"
					value={depositData.depositAccount}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
}

export default OrderForm;
