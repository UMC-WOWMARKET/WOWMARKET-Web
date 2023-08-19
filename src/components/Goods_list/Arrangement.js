import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./Theme";




const Arrangement = ({ orderBy, setOrderBy, univ, setUniv }) => {
  // const [orderBy, setOrderBy] = useState("");
  // const [univ, setUniv] = useState("");

  const [selected, setSelected] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <div className="Arrangement">
        <ArrangementContainer>
          <InputCell>
            <div className="input">
            <StyledSelect
                onChange={(e) => {
                  setOrderBy(e.target.value);
                }}
                value={orderBy}
              >
                <StyledOption value="endDate">마감임박순</StyledOption>
                <StyledOption value="view">인기순</StyledOption>
                <StyledOption value="startDate">등록순</StyledOption>
              </StyledSelect>
            </div>
          </InputCell>
          <Sharp>
          <CustomButton1
              value="myUinv"
              onClick={(e) => {
                setSelected(e.target.value);
                setUniv(e.target.value);
                
              }}
              isActive={selected === "myUinv"}
            >
              #우리학교
            </CustomButton1>
            <CustomButton2
              value="allUniv"
              onClick={(e) => {
                setSelected(e.target.value);
                setUniv(e.target.value);
              }}
              isActive={selected === "allUniv"}
            >
              #전체학교
            </CustomButton2>
          </Sharp>
        </ArrangementContainer>
      </div>
    </ThemeProvider>
  );
};

const CustomButton = styled.button`
  ${(props) => props.theme.buttons.primary};
  height: 40px;
  width: 90px;
  color: ${(props) => (props.isActive ? "#ffffff" : "#646464")};
  background-color: ${(props) => (props.isActive ? "#002472" : "transparent")};
  border: solid 2px ${(props) => (props.isActive ? "#002472" : "#f0f0f0")};
  border-radius: 5px 5px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;
  margin-right: 10px;
`;


const CustomButton1 = styled(CustomButton)`
  &:active {
    background-color: #002472;
    color: #ffffff;
    border-color: #002472;
\
  }
`;

const CustomButton2 = styled(CustomButton)`
  &:active {
    background-color: #002472;
    color: #ffffff;
    border-color: #002472;
  }
`;

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

const StyledSelect = styled.select`
  margin-top: 5px;
  height: 40px;
  width: 110px;
  padding: 5px;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  background-color: none;
  font-family: Pretendard;
  font-weight: 400;
  font-size: 15px;
  color: #646464;
`;

const StyledOption = styled.option`
  height: 30px;
  width: 100px;
`;

export default Arrangement;
