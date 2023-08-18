import React, { useState } from 'react';
import dummy from '../db/data.json';
import '../styles/OrderForm.css'

//상품 컴포넌트
const SelectGoods = ({ id, index, name, price, onChangeQuantity}) => {
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
		<span style={{marginLeft:'22px'}}>{index}. {name} </span>
		<span>{price}원</span>
		<div className="common-box button" onClick={handleDecrease} style={{margin:'auto 0 auto 12px'}}>-</div>
		<div className="common-box button" style={{margin:'auto 0 auto 0'}}>{quantity}</div>
		<div className="common-box button" onClick={handleIncrease} style={{margin:'auto 27px auto 0'}}>+</div>
	</div>
	);
}

//주문폼 컴포넌트
const OrderForm = () => {
	const [selectedMethod, setSelectedMethod] = useState(null); //수령 방법 - X
	const [goodsQuantities, setGoodsQuantities] = useState({}); // 상품 선택 - 수량 저장
	//배송 정보
	const [recipientName, setRecipientName] = useState(''); //수취인명
	const [postcode, setPostcode] = useState(''); //우편번호
	const [address, setAddress] = useState(''); //주소
	const [detailAddress, setDetailAddress] = useState(''); //상세주소
	const [phoneNumber, setPhoneNumber] = useState(''); //전화번호

	const handleMethodSelection = (methodId) => {
		setSelectedMethod(methodId);
		console.log(`Selected method: ${methodId}`);
	};

	const selectedDeliveryMethod = dummy.deliveryMethod.find(method => method.id === selectedMethod);

	//우선 id를 인덱스로 하여 수량 저장했는데, 가능할 지 모르겠음
	const handleGoodsQuantityChange = (goodsId, newQuantity) => {
		setGoodsQuantities((prevQuantities) => ({
			...prevQuantities,
			[goodsId]: newQuantity,
		}));
	};

	//총 금액
	const totalPrice = dummy.goodsList.reduce((total, goods) => {
		const quantity = goodsQuantities[goods.id] || 0;
		return total + goods.price * quantity;
	}, 0);

	//총 수량
	const totalQuantity = Object.values(goodsQuantities).reduce((total, quantity) => total + quantity, 0);

	// const searchPostcode = () => {
	// 	// 다음 우편번호 검색 API 호출
	// 	// axios.get(...)을 이용하여 API 호출하고 결과 처리
	// }

	// const fillAddressInfo = selectedAddress => {
	// 		setAddress(selectedAddress.address);
	// 		setPostcode(selectedAddress.postcode);
	// }


	const [deliveryMessage, setDeliveryMessage] = useState('미리 연락 바랍니다.');

	const handleSelectMessage = (e) => {
		const selectedValue = e.target.value;
		setDeliveryMessage(selectedValue);
	};




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
			<h3 style={{margin:'37px 0 25px 0'}}>주문폼</h3>
			<div className='common-box' style={{width:'420px', height:'0px'}}></div>

			{/* 수령방법  -> 여기 싹 다 수정해야함*/}
			<div className='deliveryMethod'>
				<div className='section1'>
					<h4 style={{margin:'36px 0 16px 0'}}>수령방법</h4>
					<p className='redText' style={{margin:'39px 0 18px 9px'}}>판매자가 지정한 수령방법입니다.</p>
				</div>
				<div className='section2'>
					{dummy.deliveryMethod.map((method) => (
						<div
							key={method.id}
							className={`common-box ${selectedMethod === method.id ? 'selected' : ''}`}
							onClick={() => handleMethodSelection(method.id)}
							style={{ width: '200px', height : '80px' }}
						>
							<div className='flex-column'>
								<div className='text1'>{method.name}</div>
								<div className='text2'>{method.comment}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* 상품 선택  -> 회색 버튼 css 수정*/}
			<div className='selectGoods'>
				<h4>상품 선택</h4>
				<div className='flex-column'>
					{dummy.goodsList.map((goods, index) =>(
						<SelectGoods
							key={goods.id}
							id={goods.id}
							name={goods.name}
							price={goods.price}
							index={index+1}
							onChangeQuantity={handleGoodsQuantityChange}/>
					))}
				</div>
			</div>


			{/* 주문 정보 */}
			<div className='orderInfo'>
				<h4>주문 정보</h4>
				<div className='common-box text3' style={{width:'420px'}}>
					{dummy.goodsList.map((goods) => (
						<div key={goods.id} className='flex-row'>
							<span>{goods.name}</span>
							<span>{goodsQuantities[goods.id] || 0}개</span>
							<span>{goods.price * (goodsQuantities[goods.id] || 0)}원</span>
						</div>
					))}
				</div>
				<div className='no-box'>
					<div>
						<span>총 상품 금액</span>
						<span>총 수량 {totalQuantity}개</span>
						<span>{totalPrice}원</span>
					</div>
					<div>
						<span>배송비</span>
						<span>{selectedDeliveryMethod ? selectedDeliveryMethod.cost : 0}원</span>
					</div>
					<div className='common-box' style={{width:'366px', height:'0px'}}></div>
					<div>
						<span>최종 금액</span>
						<span>{selectedDeliveryMethod ? selectedDeliveryMethod.cost + totalPrice: totalPrice}원</span>
					</div>
				</div>
			</div>


			{/* 배송 정보 */}
			<div className='deliveryInfo'>
				<h4>배송 정보</h4>
				<div className='common-box'>
					<form>
						<label htmlFor="recipientName">수취인명</label>
						<input type="text" id="recipientName" value={recipientName} onChange={e => setRecipientName(e.target.value)} required /><br></br>

						<label htmlFor="postcode">우편번호</label>
						<input type="text" id="postcode" value={postcode} onChange={e => setPostcode(e.target.value)} />
						{/* <button type="button" onClick={searchPostcode}>우편번호 검색</button>*/}<br /><br />

						<label htmlFor="address">주소</label>
						<input type="text" id="postcode" value={postcode} onChange={e => setAddress(e.target.value)} />
						<br /><br />

						<label htmlFor="detailAddress">상세주소</label>
						<input type="text" id="detailAddress" value={detailAddress} onChange={e => setDetailAddress(e.target.value)} /><br /><br />

						<label htmlFor="phoneNumber">전화번호</label>
						<input type="text" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} /><br /><br />

						<label htmlFor="deliveryMessage">배송메시지</label>
						<select id="deliveryMessage" value={deliveryMessage} onChange={handleSelectMessage}>
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
					입금계좌 {dummy.accountInfo[0].account} <br></br>
					예금주 {dummy.accountInfo[0].holder}
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
			</div>

			{/* 환불 계좌 */}
			<div className='refundAccount'>
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
