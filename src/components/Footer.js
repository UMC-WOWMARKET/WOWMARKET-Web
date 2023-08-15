<<<<<<< HEAD
import React, { useEffect } from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Footer>
      <div>
        <div>
          와우상점 | 대표 : 최서영 | 주소 : 서울시 광진구 자양로3가길 43 102동
          801호 <br />
          이메일 : 2023wowmarket@gmail.com <br />
          사업자번호 : 607-29-18656 <br />
          통신판매신고번호 : <br />
        </div>
        <div>
          와우상점은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. <br />
          상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다. <br />
        </div>
        <div>© 2023.와우상점 all rights reserved.</div>
      </div>

      <div>이용약관 | 개인정보 처리방침</div>
    </Footer>
=======
import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <span>
          <BoldText>와우상점</BoldText> | 대표 : 최서영 | 주소 : 서울시 광진구 자양로3가길 43 102동
          801호
        </span>
        <br />
        <span>이메일 : 2023wowmarket@gmail.com</span>
        <br />
        <span>사업자번호 : 607-29-18656</span>
        <br /><br />
        <BoldText>
          와우상점은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
        </BoldText>
        <br />
        <BoldText>
          상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
        </BoldText>
        <br /><br />
        <BoldText>© 2023. 와우상점 all rights reserved.</BoldText>
      </FooterContent>
      <DetailLink>
        <StyledLink to="terms-condition">이용약관</StyledLink>
        <BoldText> | </BoldText>
        <StyledLink to="privacy-policy">개인정보 처리방침</StyledLink>
      </DetailLink>
    </FooterContainer>
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
  );
}

export default Footer;
<<<<<<< HEAD
=======

const FooterContainer = styled.div`
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};
  width: ${theme.componentSize.maxWidth};
  height: 300px;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

const FooterContent = styled.div`
  padding: 60px 144px;
  font-family: "Pretendard";
  font-size: ${theme.fontSizes.body1};
  font-weight: 600;
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const DetailLink = styled.div`
  padding-top: 200px;
  padding-right: 144px;
`;

const StyledLink = styled(Link)`
  color: ${theme.colors.white};
  font-weight: 700;
  text-decoration: none;
  &:visited {
    text-decoration: none;
  }
` 
>>>>>>> f0dec7215cbe4c2a3a934c42bad4753da5d6a0f4
