import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./Theme";

const Arrangement = () => {
  const [selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
    const category_id = e.target.value;
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="Arrangement">
        <ArrangementContainer>
          <InputCell>
            <div className="input">
              <StyledSelect onChange={handleSelect} value={selected}>
                <StyledOption value="endDate">
                  마감임박순
                </StyledOption>
                <StyledOption type="popular" value="view">
                  인기순
                </StyledOption>
                <StyledOption type="regist" value="startDate">
                  등록순
                </StyledOption>
              </StyledSelect>
            </div>
          </InputCell>
          <Sharp>
            <CustomButton1 value="myUinv" onClick={() => console.log("#우리학교 선택됨")}>
              #우리학교
            </CustomButton1>
            <CustomButton2 value="allUniv" onClick={() => console.log("#전체학교 선택됨")}>
              #전체학교
            </CustomButton2>
          </Sharp>
        </ArrangementContainer>
      </div>
    </ThemeProvider>
  );
};

export default Arrangement;

const ArrangementContainer = styled.div`
  display: flex;
  margin-left: 144px;
`;

const InputCell = styled.div`
  background-color: transparent;
  margin-top: 6px;
  margin-right: 30px;
  display: block;
`;

const Sharp = styled.div`
  background-color: transparent;
  margin: 10px;

`;

const CustomButton1 = styled.button`
  ${(props) => props.theme.buttons.primary};
  height: 30px;
  width: 80px;
  color: #646464;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  margin-right: 20px;
  font-family: Pretendard;
  font-weight: 600;
`;

const CustomButton2 = styled.button`
  ${(props) => props.theme.buttons.primary};
  height: 30px;
  width: 80px;
  color: #646464;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  background-color: none;
  font-family: Pretendard;
  font-weight: 600;
`;

// 새로운 스타일드 컴포넌트를 생성하여 option의 스타일링을 적용
const StyledSelect = styled.select`
  margin-top: 5px;
  height: 30px;
  width: 95px;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  background-color: none;
  font-family: Pretendard;
  color : #646464;
`;

const StyledOption = styled.option`

  height: 30px;
  width: 100px;
`;
