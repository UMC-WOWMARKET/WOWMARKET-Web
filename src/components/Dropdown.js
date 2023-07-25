import React from 'react';
import styled from 'styled-components';
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
`

const NavLink = styled(Link)`
    top: 200px;
    text-decoration: none;
    color: inherit;
    padding: 10px 10px 10px;
    &:visited{
        text-decoration: none;
    }
`