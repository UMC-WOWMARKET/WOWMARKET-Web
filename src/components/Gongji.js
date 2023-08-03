import React, { useState } from 'react';
function Gongji() {

  const [inputs, setInputs] = useState({
    name: '',
    nickname: ''
  });

  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; 
    setInputs({
      ...inputs, 
      [name]: value 
    });
  };

  const onReset = () => {
    setInputs({
      name: '',
      nickname: '',
    })
  };


  return (
    <div>
      <input name="name" placeholder="제목" onChange={onChange} value={name} />
      <input name="nickname" placeholder="공지 내용 작성" onChange={onChange} value={nickname}/>
      <button onClick={onReset}>작성완료</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

export default Gongji;