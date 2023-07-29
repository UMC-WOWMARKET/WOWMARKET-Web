import React from 'react';
import styled from 'styled-components';

function GoodsAdd(){

    return(
        <GoodsAddContainer>
        <GoodsName>
          <div>굿즈 이름</div>
          <input />
        </GoodsName>
        <GoodsPrice>
          <div>판매 금액</div>
          <input />
        </GoodsPrice>
        <Quantity>
          <div>목표 수량</div>
          <input />
        </Quantity>
        <button>+</button>
        </GoodsAddContainer>
    )
}

export default GoodsAdd

const GoodsAddContainer = styled.div`
  margin: 10px;
`

const GoodsName = styled.div`
  display: inline-block;
  margin: 5px;
`
const GoodsPrice = styled.div`
  display: inline-block;
  margin: 5px;
`
const Quantity = styled.div`
  display: inline-block;
  margin: 5px;
`