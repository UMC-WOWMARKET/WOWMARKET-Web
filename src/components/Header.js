import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

function Header() {
  const [view, setView] = useState(false);

  return (
    <HeaderContainer>
      <Intro>
        <Adress src="/assets/linklogo.png" />
        <Insta src="/assets/insta_img.png" />
      </Intro>
      <Navigation>
        <Menu>
          <Logo>와우상점</Logo>
          <NavLink to="/">판매</NavLink>
          <NavLink to="/">수요조사</NavLink>
          <NavLink
            to="/register"
            onMouseEnter={() => {
              setView(true);
            }}
          >
            등록하기
          </NavLink>
        </Menu>
        <MemberMenu>
          <MemberLink to="/users/UnivCert">학교인증</MemberLink>
          <MemberLink to="/mypage/:user_id">my</MemberLink>
          <MemberLink to="/users/login">로그인</MemberLink>
        </MemberMenu>
      </Navigation>
      <DropdownMenu
        onMouseLeave={() => {
          setView(false);
        }}
      >
        {view && <Dropdown />}
      </DropdownMenu>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  //position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100px;
  padding-bottom: 100px;
`;

const Intro = styled.div`
  position: absoulte;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px;
  padding: 10px;
`;

const Adress = styled.img`
  height: 20px;
`;

const Insta = styled.img`
  height: 20px;
`;

const Logo = styled.div`
  //로고(이미지로)
`;

const Navigation = styled.nav`
  position: absoulte;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px;
  height: 50px;
`;
const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 13px 10px 13px;
  &:visited {
    text-decoration: none;
  }
  &:hover {
    border-bottom: solid 3px;
  }
`;

const MemberMenu = styled.div``;

const MemberLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  background-color: grey;
  &:visited {
    text-decoration: none;
  }
`;
const DropdownMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  position: absolute;
  top: 100px;
  left: 180px;
`;
