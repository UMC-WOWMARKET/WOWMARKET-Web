
import React from "react";
import { Link } from "react-router-dom";

import GoodsList from "./GoodsList";
import "./Home.css";

//const data를 삭제하시면 오류가 뜰 수 있습니다...!


const data=[ //이 데이터를 서버에서 받아올거임
	{
		p_id:"1",
    	p_name:"상품1",
        p_price:"10000",
    },
    {
		p_id:"2",
    	p_name:"상품2",
        p_price:"20000",
    },
    {
		p_id:"3",
    	p_name:"상품3",
        p_price:"30000",
    },
    {
		p_id:"4",
    	p_name:"상품4",
        p_price:"40000",
    },
]

const Home = () => {

  return (
    <div className="main">
      <div className="visual">
        <img src="images/banner1.jpg" alt="배너이미지" />
      </div>
      <div className="product">
        <h2>굿즈상점, 와우상점입니다</h2>
        <h3>판매중인 학교 굿즈를 확인해보세요!</h3>
        <ul>
          {data.map((pro) => (
            <GoodsList
              key={pro.p_id}
              p_id={pro.p_id}
              p_name={pro.p_name}
              p_price={pro.p_price}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
