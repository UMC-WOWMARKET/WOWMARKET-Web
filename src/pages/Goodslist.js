import React from 'react';
import { Link } from 'react-router-dom';

const GoodsList = ({p_id,p_price,p_name}) => {
    return (
        <li>
            <Link to={`/detailView/${p_id}`}>
                <img src={`../images/cosmetic${p_id}.JPG`} alt="" />
                <h3>{p_name}</h3>
                <p>{p_price}원</p>
                <p>간단한 설명입니다.</p>
            </Link>
        </li>
    );
};

export default GoodsList;