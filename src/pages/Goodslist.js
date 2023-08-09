
import React, { useState, useEffect } from 'react';

function Goodslist() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 백엔드에서 이미지 URL을 가져오는 비동기 함수를 호출합니다.
    fetchImageFromBackend()
      .then((data) => {
        setImageUrl(data.imageUrl);
      })
      .catch((error) => {
        console.error('이미지 가져오기 실패:', error);
      });
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="백엔드에서 가져온 이미지" />
      ) : (
        <p>이미지를 가져오는 중...</p>
      )}
    </div>
  );
}

async function fetchImageFromBackend() {
  // 이미지 URL을 백엔드에서 가져오는 비동기 함수를 정의합니다.
  // 실제로는 백엔드 API를 호출하여 이미지 URL을 받아와야 합니다.
  return new Promise((resolve) => {
    // 가상의 이미지 URL을 반환하는 예시입니다. 실제로는 백엔드 API를 호출하여 가져와야 합니다.
    setTimeout(() => {
      resolve({
        imageUrl: 'https://drive.google.com/file/d/1ZhLzmO2bIuxYBxXIZ7hoDoWmouOo_MKy/view?usp=sharing',
      });
    }, 2000); // 2초 후에 이미지 URL을 반환합니다.
  });
}

export default Goodslist;
