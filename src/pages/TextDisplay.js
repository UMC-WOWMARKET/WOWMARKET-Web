import React, { useState, useEffect } from 'react';

function TextDisplay() {
  const [text, setText] = useState('');

  useEffect(() => {
    // 백엔드에서 문구를 가져오는 비동기 함수를 호출합니다.
    fetchTextFromBackend()
      .then((data) => {
        setText(data.text);
      })
      .catch((error) => {
        console.error('문구 가져오기 실패:', error);
      });
  }, []);

  return (
    <div>
      {text ? <p>{text}</p> : <p>문구를 가져오는 중...</p>}
    </div>
  );
}

async function fetchTextFromBackend() {
  // 문구를 백엔드에서 가져오는 비동기 함수를 정의합니다.
  // 실제로는 백엔드 API를 호출하여 문구를 받아와야 합니다.
  return new Promise((resolve) => {
    // 가상의 문구를 반환하는 예시입니다. 실제로는 백엔드 API를 호출하여 가져와야 합니다.
    setTimeout(() => {
      resolve({
        text: '백엔드에서 받은 문구입니다.',
      });
    }, 2000); // 2초 후에 문구를 반환합니다.
  });
}

export default TextDisplay;