import React, { useState } from 'react';
import dummy from '../../db/data.json';

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
	const [selectedMethod, setSelectedMethod] = useState(null);
  const [goodsQuantities, setGoodsQuantities] = useState({}); // 상품별 수량 저장

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

	return (
		<div className='OrderForm'>
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
			</div>

			<div>
				<h4>판매자 계좌 정보</h4>
			</div>

			<div>
				<h4>입금 정보</h4>
			</div>

			<div>
				<h4>환불 계좌</h4>
			</div>

			<div>
				<h4>d</h4>
			</div>
		</div>
	);
}

export default OrderForm;
