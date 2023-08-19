import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import theme from "./Theme";

const Arrangement = ({ orderBy, setOrderBy, univ, setUniv }) => {
  // const [orderBy, setOrderBy] = useState("");
  // const [univ, setUniv] = useState("");

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
                setUniv(e.target.value);
              }}
            >
              #우리학교
            </CustomButton1>
            <CustomButton2
              value="allUniv"
              onClick={(e) => {
                setUniv(e.target.value);
              }}
            >
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
  height: 40px;
  width: 90px;
  color: #646464;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  margin-right: 20px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;

  &:active {
    background-color: #002472;
    color: #ffffff;
    border-color: #002472;
  }

  /*로그인하기 전 띄워져야하는 화면
  &[url = /goods?page_type=selling] {
    background-color: #002472; 
    color: #ffffff; 
    border-color: #002472; 
  }
 */
`;

const CustomButton2 = styled.button`
  ${(props) => props.theme.buttons.primary};
  height: 40px;
  width: 90px;
  color: #646464;
  border: solid 2px #f0f0f0;
  border-radius: 5px 5px;
  background-color: none;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 16px;

  &:active {
    background-color: #002472;
    color: #ffffff;
    border-color: #002472;
  }

  /*로그인하고 선택가능한 화면
  &[url = /goods?page_type=selling] {
    background-color: #002472; 
    color: #ffffff; 
    border-color: #002472; 
  }
*/
`;

// 마감임박순/인기순/등록순
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
