import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeForm = ({onSubmit}) => {
		const [title, setTitle] = useState('');
		const [content, setContent] = useState('');

		const handleSubmit = (e) => {
			e.preventDefault();

				if (title && content) {
						onSubmit(title, content);
						setTitle('');
						setContent('');
				} else {
						window.alert("제목과 내용을 입력하세요.");
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

// 공지 아이템 컴포넌트
const NoticeItem = ({ key, index, title, content, time }) => {
		const [showContent, setShowContent] = useState(false);

		const handleToggleContent = () => {
			setShowContent(!showContent);
		}

		return (
			<div key={key} onClick={handleToggleContent} style={{cursor:'pointer'}}>
				<span>{index + 1} | {title} | {time} </span>
				{showContent && <p>{content}</p>}
			</div>
		)
};

// 공지 목록 컴포넌트
const NoticeList = () => {
		// const [title, setTitle] = useState('');
		// const [content, setContent] = useState('');
		const [showForm, setShowForm] = useState(false);
		const [posts, setPosts] = useState([]);

		// const posts = [
		// 	{"notice_id":11, "title":"제목1입니다", "content":"내용입니다12131212441", "createdTime":"20230101"},
		// 	{"notice_id":13, "title":"제목2입니다", "content":"내용2441", "createdTime":"20230102"},
		// 	{"notice_id":15, "title":"제목3입니다", "content":"다12131212441", "createdTime":"20230103"},
		// ];

		const fetchData = async () => {
			try {
				const response = await axios.get('http://www.wowmkt.kr/project/3/notice');
				setPosts(response.data);
				console.log('GET Success');
				console.log(response.data)
			} catch (error) {
				console.error('GET Error:', error);
			}
		}

		useEffect(() => { fetchData() }, []); //GET

		const handleAddPost = async (title, content) => { //POST
			const postData = {
				title: title,
				content: content
			};

			console.log(postData);
			try {
				await axios.post('http://www.wowmkt.kr/project/3/notice', postData, { 		headers: {
						'Content-Type': 'application/json'
					},
				});
				fetchData();
				console.log('POST Success');
			} catch (error) {
				console.error('POST Error:', error);
			}
			setShowForm(false);
		};

		return (//GET
				<div>
						<div>
								<span>번호</span> | <span>제목</span> | <span>작성일</span>
						</div>
						{showForm ? (
								<NoticeForm onSubmit={handleAddPost} />
						) : (
								<div>
										{posts.map((post, index) => (
												<NoticeItem
													key={post.notice_id}
													index={index}
													title={post.title}
													content={post.content}
													time={post.createdTime} />
										))}
										<button onClick={() => setShowForm(true)}>등록하기</button>
								</div>
						)}
				</div>
		);
};

export default NoticeList;

