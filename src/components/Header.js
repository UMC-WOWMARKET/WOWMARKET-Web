import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";

function Header() {
  const [view, setView] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userAccessToken = localStorage.getItem("accessToken");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (userAccessToken) {
      //로그인된 사용자
      console.log(`유저토큰존재`);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userAccessToken]);

  return (
    <HeaderContainer>
      <Navigation>
        <Menu>
          <Logo src="/assets/wow_logo.png" />
          <NavLink to="/goods?page_type=selling">판매</NavLink>
          <NavLink to="/goods?page_type=demand">수요조사</NavLink>
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
          {/* <MemberLink to="/users/univCert">학교인증</MemberLink> */}
          {isLogin && <MemberLink to="/myinfo">my</MemberLink>}
          {isLogin && <MemberLink onClick={logout}>로그아웃</MemberLink>}
          {!isLogin && <MemberLink to="/users/login">로그인</MemberLink>}
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
  // position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  margin-bottom: 10%;

  background-color: white;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px;
  width: 90%;
  height: 100px;

  padding-left: 5%;
  padding-right: 5%;
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
  color: white;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  background-color: rgba(0, 36, 114, 1);
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
