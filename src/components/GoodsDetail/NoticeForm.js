import React, { useState } from 'react';

const NoticeForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && content) {
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="title"
					placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          id="content"
					placeholder="공지 내용 작성"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>작성완료</button>
    </div>
  );
};

export default NoticeForm;
