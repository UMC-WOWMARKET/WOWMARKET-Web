import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useState } from "react";
import theme from "../styles/Theme";

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
  
  const changeImage = (event) => {
    event.target.src = "/assets/mypage_hover.png";
  }; //마이페이지 마우스오버 시 변화

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
<<<<<<< HEAD
          <Logo src="/assets/wow_logo.png" />
=======
          <Logo src="/assets/weblogo.png " />
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
          <NavLink to="/goods?page_type=selling">판매</NavLink>
          <NavLink to="/goods?page_type=demand">수요조사</NavLink>
          <NavLink
            onMouseEnter={() => {
              setView(true);
            }}
          >
            등록하기
          </NavLink>
        </Menu>
        <MemberMenu>
<<<<<<< HEAD
          {/* <MemberLink to="/users/univCert">학교인증</MemberLink> */}
          {isLogin && <MemberLink to="/myinfo">my</MemberLink>}
=======
          {isLogin && (
            <Link to="/mypage">
              <StyledImage
                src="/assets/mypage_default.png"
                alt="마이페이지"
                onMouseEnter={changeImage}
                onMouseLeave={(event) => (event.target.src = "/assets/mypage_default.png")}
              />
            </Link>
          )}
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
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
<<<<<<< HEAD
  // position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  margin-bottom: 10%;

  background-color: white;
=======
  position: fixed;
  top: 0;
  left: 0;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: ${theme.fontSizes.headline3};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${theme.componentSize.maxWidth};
  height: 100px;
  z-index: 1000;
  background-color: ${theme.colors.white};
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
`;

const Logo = styled.img`
  width: 48px;
<<<<<<< HEAD
  height: 48px;
=======
  margin-right: 37px;
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
<<<<<<< HEAD
  border-bottom: solid 1px;
  width: 90%;
  height: 100px;

  padding-left: 5%;
  padding-right: 5%;
=======
  border-bottom: ${theme.colors.lightgrey} solid 2px;
  height: 100px;
  padding: 0 144px;
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.darkgrey};
  padding: 37px 30px 37px;
  &:visited {
    text-decoration: none;
  }
  &:hover {
    color: ${theme.colors.primaryColor};
    border-bottom: ${theme.colors.primaryColor} solid 5px;
  }
`;

const MemberMenu = styled.div`
  height: 45px;
  display: flex;
`;

const MemberLink = styled(Link)`
  text-decoration: none;
<<<<<<< HEAD
  color: white;
  border-radius: 10px;
  margin: 5px;
  padding: 5px;
  background-color: rgba(0, 36, 114, 1);
=======
  display: flex;
  justify-content: center;
  align-items: center;
  width: 117px;
  height: 45px;
  margin-left: 36px;
  color: ${theme.colors.darkgrey};
  border-radius: 10px;
  background-color: ${theme.colors.secondaryColor};
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
  &:visited {
    text-decoration: none;
  }
`;
const DropdownMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  position: absolute;
  top: 100px;
  left: 0;
`;

const StyledImage = styled.img`
`;