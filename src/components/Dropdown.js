import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";
import { Link } from "react-router-dom";

function Dropdown() {
  return (
    <DropdownContainer>
      <NavLink to="/register/project">판매</NavLink>
      <NavLink to="/register/demand">수요조사</NavLink>
    </DropdownContainer>
  );
}

export default Dropdown;

const DropdownContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 100px;
  padding: 24px 0 ;
  background-color: ${theme.colors.white};
`;

const NavLink = styled(Link)`
  font-family: "Pretendard";
  font-size: 18px;
  left: 300px;
  top: 200px;
  text-decoration: none;
  font-weight: 500;
  color: ${theme.colors.darkgrey};
  margin: 24px;
  &:visited {
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.primaryColor};
  }
`;
