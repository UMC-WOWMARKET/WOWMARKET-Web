import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
	const [secret, setSecret] = useState(false);

  const handleSubmit = (e) => {
		e.preventDefault();

    if (title && content) {
			onSubmit(title, content, secret);
			setTitle('');
			setContent('');
			setSecret(false);
    } else {
			window.alert("제목과 내용을 입력하세요.");
		}
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="title"
					placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          id="content"
					placeholder="문의 내용을 작성해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
			<label>
        <input
          type="checkbox"
          checked={secret}
          onChange={(e) => setSecret(e.target.checked)}
        />{' '}
        비밀글
      </label>
      <button onClick={handleSubmit}>작성완료</button>
    </div>
  );
};

//문의 아이템
const QuestionItem = ({key, goods_id, question_id, index, title, time}) => {
	const [content, setContent] = useState("");
	const [showContent, setShowContent] = useState(false);

	const getContent = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/question/${question_id}`);
			setContent(response.data.content);
			console.log('question content GET Success');
			console.log(content)
		} catch (error) {
			console.error('question content GET Error:', error);

		}
	}

	useEffect(() => { getContent() }, [goods_id]); //GET
	const handleToggleContent = () => {
		setShowContent(!showContent);
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	return (
		<div key={key} onClick={handleToggleContent} style={{cursor:'pointer'}}>
			<span>{index + 1} | {title} | {formatDate(time)} </span>
			{showContent && <p>{content}</p>}

		</div>
	)
}

//문의 목록
const QuestionList = ({goods_id}) => {
	const [showForm, setShowForm] = useState(false);
	//for GET
	const [posts, setPosts] = useState([]);

	const getList = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/question`);
			setPosts(response.data);
			console.log('question GET Success');
			console.log(response.data)
		} catch (error) {
			console.error('question GET Error:', error);
		}
	}

	useEffect(() => { getList() }, []); //GET

	const handleAddPost = async (title, content, secret) => { //POST
		const postData = {
			title: title,
			content: content,
			secret: secret
		};
		console.log(postData);
		try {
			await axios.post(`http://www.wowmkt.kr/project/${goods_id}/question`, postData);
			getList();
			console.log('question POST Success');
		} catch (error) {
			console.error('question POST Error:', error);
		}
		setShowForm(false);
	};

	return (
		<div>
			<div>
				<span>번호</span> | <span>제목</span> | <span>작성일</span>
			</div>
			{showForm ? (
				<QuestionForm onSubmit={handleAddPost} /> //showForm이 true면 PostForm 렌더링
			) : (		//false면 글 목록
				<div>
					{posts.map((post, index) => (
						<QuestionItem
						key={post.id}
						goods_id={goods_id}
						question_id={post.id}
						index={index}
						title={post.title}
						time={post.createdTime} />
					))}
					<button onClick={() => setShowForm(true)}>등록하기</button>
				</div>
			)}
		</div>
	);
};

export default QuestionList;
