import React, { useState } from "react";

const Arrangement = () => {
  const [selected, setSelected] = useState(""); 

  const handleSelect = (e) => {
    setSelected(e.target.value);
    const category_id = e.target.value; 
  };

  const ArrangementContainer = ({ children }) => {
    return <div className="arrangement-container">{children}</div>;
  };
  
  const InputCell = ({ children }) => {
    return <div className="input-cell">{children}</div>;
  };
  
  const Label = ({ children }) => {
    return <label className="label">{children}</label>;
  };

  return (
    <div className="Arrangement">
      <ArrangementContainer>
        <InputCell>
          <select onChange={handleSelect} value={selected}>
            <option value="clothing">마감임박순</option>
            <option value="staitonery">등록순</option>
            <option value="sticker">인기순</option>
          </select>
        </InputCell>
        <InputCell>
          <button onClick={() => console.log("#우리학교 선택됨")}>#우리학교</button>
          <button onClick={() => console.log("#전체학교 선택됨")}>#전체학교</button>
        </InputCell>
      </ArrangementContainer>
    </div>
  );
};

export default Arrangement;

