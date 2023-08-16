import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/Theme";

function ReceiveType({ onRecieveChange, onAddressChange, onDeliveryFeeChange }) {
  const [option1Selected, setOption1Selected] = useState(true);
  const [inputPrice, setInputPrice] = useState("");
  const [inputAdress, setInputAdress] = useState("");

  const handleOption1Change = () => {
    setOption1Selected(true);
    setInputAdress("");
  };
  const handleOption2Change = () => {
    setOption1Selected(false);
    setInputPrice("");
  };
  const handlePriceInputChange = (event) => {
    setInputPrice(event.target.value);
  };
  const handleAdressInputChange = (event) => {
    setInputAdress(event.target.value);
  };

  useEffect(() => {
    if (option1Selected) {
      onRecieveChange("delivery");
      onAddressChange(null);
      onDeliveryFeeChange(inputPrice);
    }
    else {
      onRecieveChange("pickup");
      onAddressChange(inputAdress);
      onDeliveryFeeChange(null);
    }
  });

  return (
    <OptionContainer>
      <label>
        <input
          type="radio"
          name="option"
          value="delivery"
          checked={option1Selected}
          onChange={handleOption1Change}
        />
        택배
      </label>
      <Input
        type="text"
        value={inputPrice}
        onChange={handlePriceInputChange}
        disabled={!option1Selected}
        placeholder="택배비 입력(단위: 원)"
        required
      />
      <label>
        <input
          type="radio"
          name="option"
          value="venue"
          checked={!option1Selected}
          onChange={handleOption2Change}
        />
        장소 지정
      </label>
      <Input
        type="text"
        value={inputAdress}
        onChange={handleAdressInputChange}
        disabled={option1Selected}
        placeholder="수령장소 입력"
        required
      />
    </OptionContainer>
  );
}

export default ReceiveType;

const OptionContainer = styled.span`
`;

const Input = styled.input`
  margin-top: 12px;
  padding-left: 15px;
  margin: 0 15px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  ::placeholder{
    color: ${theme.colors.lightgrey};
  };
`;
