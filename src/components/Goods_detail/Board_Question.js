import React, { useState } from 'react';

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && content) {
			const questionData = { title, content };
      const jsonString = JSON.stringify(questionData, null, 2);
			console.log(jsonString);

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

const QuestionList = () => {
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
				<QuestionForm onSubmit={handleAddPost} /> //showForm이 true면 PostForm 렌더링
			) : (		//false면 글 목록
				<div>
					{posts.map((post, index) => (
						<ul key={index}>
							<span>{index + 1} </span> | {post.title}
						</ul>
					))}
					<button onClick={() => setShowForm(true)}>등록하기</button>
				</div>
			)}
		</div>
	);
};

export default QuestionList;
