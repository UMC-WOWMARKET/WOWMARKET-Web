import React, { useState } from 'react';

//공지 입력
const NoticeForm = ({ onSubmit }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleSubmit = () => {
		if (title && content) {
			const noticeData = { title, content };
			const jsonString = JSON.stringify(noticeData, null, 2);
			console.log(jsonString);

			onSubmit({ title, content });
			setTitle('');
			setContent('');
		}
	};

	return (
		<div>
			<input
				type="text"
				id="title"
				placeholder="제목"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				id="content"
				placeholder="공지 내용 작성"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button onClick={handleSubmit}>작성완료</button>
		</div>
	);
};

//공지 목록
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
				<span>번호</span> | <span>제목</span> | <span>작성일</span>
			</div>
			{showForm
			? ( <NoticeForm onSubmit={handleAddPost} /> )
			: (
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

export default NoticeList;
