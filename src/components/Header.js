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
          <Logo src="/assets/weblogo.png " />
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
          {isLogin && (
            <Link to="/myinfo">
              <StyledImage
                src="/assets/mypage_default.png"
                alt="마이페이지"
                onMouseEnter={changeImage}
                onMouseLeave={(event) =>
                  (event.target.src = "/assets/mypage_default.png")
                }
              />
            </Link>
          )}
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
  width: 100%;
  border-bottom: ${theme.colors.lightgrey} solid 2px;
`;

const Logo = styled.img`
  width: 48px;
  margin-right: 37px;
`;

const Navigation = styled.nav`
  position: absoulte;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100px;
  padding: 0 144px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 117px;
  height: 45px;
  margin-left: 36px;
  color: ${theme.colors.darkgrey};
  border-radius: 10px;
  background-color: ${theme.colors.secondaryColor};
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

const StyledImage = styled.img``;
