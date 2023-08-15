import React from 'react';
import styled from 'styled-components';
import theme from "../styles/Theme";
import { Link } from 'react-router-dom';

function Dropdown(){
    return(
        <DropdownContainer>
            <NavLink to="/register/project">판매</NavLink>
            <NavLink to="/register/demand">수요조사</NavLink>
        </DropdownContainer>
    )
}

export default Dropdown

const DropdownContainer = styled.div`
  position: fixed;
  left: 450px;
  margin: 24px;
  margin-top: 100px;
`

const NavLink = styled(Link)`
    top: 200px;
    text-decoration: none;
    font-weight: 500;
    color: ${theme.colors.darkgrey};
    margin: 24px;
    &:visited{
        text-decoration: none;
    }
    &:hover {
    color: ${theme.colors.primaryColor};
  }
`