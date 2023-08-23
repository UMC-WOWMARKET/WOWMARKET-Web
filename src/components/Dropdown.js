import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";
import { Link } from "react-router-dom";

function Dropdown() {
  return (
    <DropdownContainer>
      <NavLink1 to="/register/project">판매</NavLink1>
      <NavLink2 to="/register/demand">수요조사</NavLink2>
    </DropdownContainer>
  );
}

export default Dropdown;

const DropdownContainer = styled.div`
  margin-left: 480px;
  width: 100%;
  top: 100px;
  padding: 24px 0 ;

  background-color: transparent;
`;

const NavLink1 = styled(Link)`
  margin-right: 30px;
  font-family: "Pretendard";
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  color: ${theme.colors.darkgrey};
  &:visited {
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.primaryColor};
  }
`;
const NavLink2 = styled(Link)`
  margin-right: 100px;
  font-family: "Pretendard";
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
  color: ${theme.colors.darkgrey};
  &:visited {
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.primaryColor};
  }
`;