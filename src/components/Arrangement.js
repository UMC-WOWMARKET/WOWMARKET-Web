import React, { useState } from "react";
import styled from 'styled-components';

const Arrangement = () => {
  const [selected, setSelected] = useState(""); 

  const handleSelect = (e) => {
    setSelected(e.target.value);
    const category_id = e.target.value; 
  };

  return (
    <div className="Arrangement">
      <ArrangementContainer>
        <InputCell>
          <select onChange={handleSelect} value={selected}>
            <option value="clothing">마감임박순</option>
            <option value="staitonery">인기순</option>
            <option value="sticker">등록순</option>
          </select>
        </InputCell>
        <Sharp>
          <button onClick={() => console.log("#우리학교 선택됨")}>#우리학교</button>
          <button onClick={() => console.log("#전체학교 선택됨")}>#전체학교</button>
        </Sharp>
      </ArrangementContainer>
    </div>
  );
};

export default Arrangement;

const ArrangementContainer =styled.div`
 display: felx;
 display: block-flex;
`
const InputCell =styled.div`
  background-color: transparent;
`
const Sharp =styled.div`
 background-color: transparent;
`