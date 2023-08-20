import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/Theme";

const GoodsAdd = ({ onGoodsAdd }) => {
  const [products, setProducts] = useState([
    { item_name: "", price: "", goal: "" },
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
    const updatedProduct = [...products];
    updatedProduct[index][e.target.id] = e.target.value;
    setProducts(updatedProduct);
  };

  useEffect(() => {
    onGoodsAdd(products);
  });

  return (
    <GoodsAddContainer>
      <Labels>
        <LabelName>굿즈 이름
          <span>공백포함 12자 이내</span>
        </LabelName>
        <LabelPrice>판매 금액</LabelPrice>
        <LabelGoal>목표 수량</LabelGoal>
      </Labels>
      {products.map((item, index) => (
        <GoodsDetail key={index}>
          <NameInput
            id="item_name"
            value={item.item_name}
            onChange={(e) => handleChange(index, e)}
            maxLength={12}
            required
          />
          <PriceInput
            id="price"
            value={item.price}
            onChange={(e) => handleChange(index, e)}
            required
          />
          <GoalInput
            id="goal"
            value={item.goal}
            onChange={(e) => handleChange(index, e)}
            required
          />
          {products.length > 1 && (
            <DeleteButton type="button" onClick={() => handleProductRemove(index)}>
              {" "}
              -{" "}
            </DeleteButton>
          )}
        </GoodsDetail>
      ))}
      <AddButton type="button" onClick={handleProductAdd}>
        +
      </AddButton>
    </GoodsAddContainer>
  );
};
export default GoodsAdd;

const GoodsAddContainer = styled.div`
  width: 100%;
  font-family: "Pretendard";
  text-align: left;
`;

const Labels = styled.div`
  margin: 10px 0;
  display: flex;
  color: ${theme.colors.darkgrey};
  font-size: 12px;
`;

const LabelName = styled.div`
  width: 320px;
  margin-right: 6px;
  span {
    font-weight: normal;
    color: ${theme.colors.grey};
    margin-left: 8px;
  }
`;

const LabelPrice = styled.div`
  width: 120px;
  margin-right: 1px;
`;

const LabelGoal = styled.div`
  width: 120px;
  margin-right: 12px;
`;

const GoodsDetail = styled.div`
  width: 636px;
  display: flex;
`;

const NameInput = styled.input`
  width: 320px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;
const PriceInput = styled.input`
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  width: 120px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;
const GoalInput = styled.input`
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  width: 120px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;

const DeleteButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  font-size: 24px;
`;

const AddButton = styled.button`
  width: 636px;
  height: 32px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  font-size: 24px;
`;