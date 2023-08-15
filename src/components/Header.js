import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import { useState } from 'react';

function Header() {
    const [view, setView] = useState(false); 

    return(
        <HeaderContainer>
            <Navigation>
                <Menu>
                    <Link to="/"><Adress src="/assets/logo.png" /></Link> 
                    <NavLink to="/">판매</NavLink>
                    <NavLink to="/">수요조사</NavLink>
                    <NavLink onMouseEnter={() => {setView(true)}}>등록하기</NavLink>
                </Menu>
                <MemberMenu>
                    <MemberLink to="/mypage/:user_id">my</MemberLink>
                    <MemberLink to="/users">로그인</MemberLink>
                </MemberMenu>
            </Navigation>
            <DropdownMenu onMouseLeave={() => {setView(false)}}>
                    {view && <Dropdown />}
            </DropdownMenu>
        </HeaderContainer>
    )
}

export default Header


const HeaderContainer = styled.div`
    display: block;
    border-bottom : solid 2px; black;
    height : 100px;
`


const Navigation = styled.nav`
  position: absoulte;
  display: flex;
  `

  const Adress = styled.img`
  
  height: 20px;
`



const Menu = styled.div`
    left: 144;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    padding: 13px 10px 13px;
    &:visited{
        text-decoration: none;
    }
    &:hover {
        border-bottom: solid 3px;
    }
`

const MemberMenu = styled.div`
`

const MemberLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    border-radius: 10px;
    margin: 5px;
    padding: 5px;
    background-color: grey;
    &:visited{
        text-decoration: none;
    }
`
const DropdownMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  position: absolute;
  top: 100px;
  left: 180px;
`