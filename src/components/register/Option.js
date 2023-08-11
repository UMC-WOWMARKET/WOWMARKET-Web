import React, { useState } from "react";
import styled from "styled-components";

function Option({ onRecieveChange, onAddressChange }) {
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

  // 택배 선택 -> "delivery" 전달
  if (option1Selected) {
    onRecieveChange("delivery");
    onAddressChange(null);
  }
  // 장소지정 선택 -> 입력받은 장소 전달
  else {
    onRecieveChange("pickup");
    onAddressChange(inputValue);
  }

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
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        disabled={option1Selected}
        required
      />
    </OptionContainer>
  );
}

export default Option;

const OptionContainer = styled.div`
  float: left;
`;
