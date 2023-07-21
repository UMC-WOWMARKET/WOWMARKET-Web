import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Link } from 'react-router-dom';

function Header() {

    return(
        <HeaderContainer>
            <Intro>
                <Adress>wowmarket.com</Adress>
                <Insta>instagram</Insta>
            </Intro>
            <BrowserRouter>
                <Navigation>
                    <Menu>
                        <Logo>와우상점</Logo>
                        <NavLink to="/home/best">홈</NavLink>
                        <NavLink to="/store">판매</NavLink>
                        <NavLink to="/demand">수요조사</NavLink>
                        <NavLink to="/register">등록하기</NavLink>
{/*                         <RegisterMenu>
                            <NavLink to="/register/project">판매</NavLink>
                            <NavLink to="/register/demand">수요조사</NavLink>
                        </RegisterMenu> */}
                    </Menu>
                    <MemberMenu>
                        <MemberLink to="/mypage">my</MemberLink>
                        <MemberLink to="/login">로그인</MemberLink>
                    </MemberMenu>
                </Navigation>
            </BrowserRouter>
        </HeaderContainer>
    )
}

export default Header


const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 80px;
`

const Intro = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px;
    padding: 10px;
`

const Adress = styled.div`
    //주소-클릭시 들어가는건가?
`

const Insta = styled.div`
    //인스타 이미지와 링크?
`

const Logo = styled.div`
    //로고(이미지로)
`

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px;
  height: 50px;
`
const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    padding: 10px 10px 10px;
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