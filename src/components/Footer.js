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
  );
}

export default Footer;
