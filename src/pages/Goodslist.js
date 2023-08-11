import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    // 실제로는 서버에서 데이터를 가져오는 로직을 구현해야 합니다.
    // 예제에서는 임의의 가짜 데이터를 생성합니다.
    const newProducts = Array.from({ length: 9 }, (_, index) => ({
      seller: `판매자 ${index + products.length + 1}`,
      productName: `상품 ${index + products.length + 1}`,
    }));

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts([...products, ...newProducts]);
  };

  useEffect(() => {
    // 초기 데이터 로딩을 위해 fetchMoreData를 호출합니다.
    fetchMoreData();
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 호출하도록 합니다.

  const renderProductsGrid = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 3) {
      const row = (
        <div key={i} style={{ display: 'flex', marginBottom: '20px' }}>
          {products.slice(i, i + 3).map((product, index) => (
            <div key={index} style={{ marginRight: '20px' }}>
              <strong>판매자: </strong>
              {product.seller}
              <br />
              <strong>상품 이름: </strong>
              {product.productName}
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }
    return rows;
  };

  return (
    <div>
      <h1>무한 스크롤 상품 목록</h1>
      {/* 초기 데이터 로딩 시에도 무한 스크롤 컴포넌트가 보이도록 합니다. */}
      <InfiniteScroll
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        initialScrollY={0} // 초기 스크롤 위치를 맨 위로 설정합니다.
      >
        {renderProductsGrid()}
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
