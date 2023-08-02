import React from "react";
import styled from "styled-components";
import { useState } from "react";

function GoodsAdd(props) {
  const [products, setProducts] = useState([
    { pdName: "", price: "", quantity: 0},
  ]);

  const handleProductAdd = () => {
    setProducts([...products, { pdName: "", price: "", quantity: 0}]);
  };

  const handleProductRemove = (index) => {
    const filteredPd = [...products];
    filteredPd.splice(index, 1);
    setProducts(filteredPd);
  };

  const handleChange = (index, e) => {
    const list = [...products];
    list[index][e.target.id] = e.target.value;
    setProducts(list);
  };

  return (
    <GoodsAddContainer>
      {products.map((item, index) => (
        <GoodsDetail key={index}>
          <GoodsName>
            <div>굿즈 이름</div>
            <Input
              id="pdName"
              value={item.pdName}
              onChange={(e) => handleChange(index, e)}
            />
          </GoodsName>
          <GoodsPrice>
            <div>판매 금액</div>
            <Input
              id="price"
              value={item.price}
              onChange={(e) => handleChange(index, e)}
            />
          </GoodsPrice>
          <Quantity>
            <div>목표 수량</div>
            <Input
              id="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(index, e)}
            />
          </Quantity>
          {products.length > 1 && (
              <button onClick={() => handleProductRemove(index)}> - </button>
          )}
        </GoodsDetail>
      ))}
      <button onClick={handleProductAdd}>+</button>
    </GoodsAddContainer>
  );
}
export default GoodsAdd;

const GoodsAddContainer = styled.div`
  width: 100%;
`;

const GoodsDetail = styled.div`
  width: 100%;
  display: flex;
`;

const GoodsName = styled.div`
  display: inline-block;
  margin: 5px;
`;
const GoodsPrice = styled.div`
  display: inline-block;
  margin: 5px;
`;
const Quantity = styled.div`
  display: inline-block;
  margin: 5px;
`;
const Input = styled.input`
  border-radius: 10px;
  border: solid 1px;
  height: 20px;
  margin:5px;
  padding: 5px;
`