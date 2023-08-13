import React from "react";
import styled from "styled-components";
import { useState } from "react";

function GoodsAdd({submitFunction}) {
  const [products, setProducts] = useState([
    { item_name: "", price: "", goal: ""},
  ]); //굿즈 등록 관련 정보

  const handleProductAdd = () => {
    setProducts([...products, { item_name: "", price: "", goal: "" }]);
  }; //굿즈 등록란 추가

  const handleProductRemove = (index) => {
    const filteredPd = [...products];
    filteredPd.splice(index, 1);
    setProducts(filteredPd);
  }; //굿즈 등록란 삭제

  const handleChange = (index, e) => {
    const list = [...products];
    list[index][e.target.id] = e.target.value;
    setProducts(list);
  };

  submitFunction(products); //상위 컴포넌트로 배열 값 전달

  return (
    <GoodsAddContainer>
      <Labels>
        <Label>굿즈 이름</Label>
        <Label>판매 금액</Label>
        <Label>목표 수량</Label>
      </Labels>
      {products.map((item, index) => (
        <GoodsDetail key={index}>
          <NameInput
              id="item_name"
              value={item.item_name}
              onChange={(e) => handleChange(index, e)}
            />
          <PriceInput
              id="price"
              value={item.price}
              onChange={(e) => handleChange(index, e)}
            />
          <GoalInput
              id="goal"
              value={item.goal}
              onChange={(e) => handleChange(index, e)}
            />
          {products.length > 1 && (
              <button type="button" onClick={() => handleProductRemove(index)}> - </button>
          )}
        </GoodsDetail>
      ))}
      <button type="button" onClick={handleProductAdd}>+</button>
    </GoodsAddContainer>
  );
}
export default GoodsAdd;

const GoodsAddContainer = styled.div`
  width: 100%;
`;

const Labels = styled.div`
  margin: 10px;
  display: flex;
`
const Label = styled.div`
  margin: 0 20px;
  width: 30%;
`
const GoodsDetail = styled.div`
  width: 100%;
  display: flex;
`;

const NameInput = styled.input`
  width: 80%;
  border-radius: 10px;
  border: solid 1px;
  height: 20px;
  margin:5px;
  padding: 5px;
  display: inline-block;
  margin: 5px 10px;
`;
const PriceInput = styled.input`
  border-radius: 10px;
  border: solid 1px;
  height: 20px;
  margin:5px;
  padding: 5px;
  display: inline-block;
  margin: 5px 10px;
`;
const GoalInput = styled.input`
  border-radius: 10px;
  border: solid 1px;
  height: 20px;
  margin:5px;
  padding: 5px;
  display: inline-block;
  margin: 5px 10px;
`