import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../styles/Theme";

function ReceiveType({ onRecieveChange, onAddressChange }) {
  const [option1Selected, setOption1Selected] = useState(true);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOption1Change = () => {
    setOption1Selected(true);
    setInputEnabled(false);
  };
  const handleOption2Change = () => {
    setOption1Selected(false);
    setInputEnabled(true);
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (option1Selected) {
      onRecieveChange("delivery");
      onAddressChange(null);
    }
    else {
      onRecieveChange("pickup");
      onAddressChange(inputValue);
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
        value={inputValue}
        onChange={handleInputChange}
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
  margin-left: 15px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  ::placeholder{
    color: ${theme.colors.lightgrey};
  };
`;
