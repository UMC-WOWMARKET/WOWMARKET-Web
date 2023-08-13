import React, { useState } from 'react';
import NoticeForm from './NoticeForm';

const NoticeList = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddPost = (post) => {
    setPosts([...posts, post]);
    setShowForm(false);
  };

  return (
    <div>
			<div>
				<span>번호</span> | <span>제목</span>
			</div>
      {showForm ? (
        <NoticeForm onSubmit={handleAddPost} /> //showForm이 true면 PostForm 렌더링
      ) : (		//false면 글 목록
        <div>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <span>{index + 1} </span> | {post.title}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowForm(true)}>등록하기</button>
        </div>
      )}
    </div>
  );
};

export default NoticeList;
