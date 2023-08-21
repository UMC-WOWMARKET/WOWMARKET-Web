import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/GoodsBoard.css'

const NoticeForm = ({onSubmit}) => {
		//for POST
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
				placeholder="제목을 입력해주세요"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<textarea
				id="content"
				placeholder="공지 내용을 작성해주세요"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button onClick={handleSubmit}>작성완료</button>
		</div>
	);
};

// 공지 아이템 컴포넌트
const NoticeItem = ({ key, goods_id, notice_id, index, title, time }) => {
		const [content, setContent] = useState("");
		const [showContent, setShowContent] = useState(false);

		const getContent = async () => {
			try {
				const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/notice/${notice_id}`);
				setContent(response.data.content);
				console.log('notice content GET Success');
				console.log(content)
			} catch (error) {
				console.error('notice content GET Error:', error);
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
			<div>
				<div className='noticeItem' key={key} onClick={handleToggleContent} style={{cursor:'pointer', margin:'13px 35px 13px 35px'}}>
					<div>{index + 1}</div>
					<div>{title}</div>
					<div>{formatDate(time)}</div>
				</div>
				<div className='common-box' style={{width:'560px', height:'0px'}}></div>
				{showContent && <p>{content}</p>}
			</div>
		)
};

// 공지 목록 컴포넌트
const NoticeList = ({goods_id}) => {
		const [showForm, setShowForm] = useState(false);
		const [showButton, setShowButton] = useState(false);
		//for GET
		const [posts, setPosts] = useState([]);
		const [userId, setUserId] = useState(0);
		const [sellerId, setSellerId] = useState(0);

		const getList = async () => {
			try {
				const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/notice`);
				setPosts(response.data.noticeLists);
				console.log(response.data);
				// setUserId(response.data.user_id);
				// setSellerId(response.data.seller_id);

				// if (userId === sellerId) {
				// 	setShowButton(true);
				// }

				console.log('notice GET Success');
				console.log(posts)
			} catch (error) {
				console.error('notice GET Error:', error);
			}
		}

		useEffect(() => { getList() }, [goods_id]); //GET

		const handleAddPost = async (title, content) => { //POST
			const postData = {
				title: title,
				content: content
			};
			console.log(postData);
			try {
				await axios.post(`http://www.wowmkt.kr/project/${goods_id}/notice`, postData);
				getList();
				console.log('notice POST Success');
			} catch (error) {
				console.error('Notice POST Error:', error);
			}
			setShowForm(false);
		};

		return (//GET
		<div>
			<div>
				{showForm ? (
					<div className='common-box' style={{flexDirection:'column'}}>
						<NoticeForm onSubmit={handleAddPost} />
					</div>
				) : (
					<div>
						<div className='common-box' style={{flexDirection:'column'}}>
							<div className='flex-row' style={{}}>
								<div>번호</div>
								<div>제목</div>
								<div>작성일</div>
							</div>
							<div className='common-box' style={{width:'560px', height:'0px'}}></div>
							{posts.map((post, index) => (
								<NoticeItem
									key={post.notice_id}
									goods_id={goods_id}
									notice_id={post.notice_id}
									index={index}
									title={post.title}
									time={post.createdTime}
								/>
							))}
						</div>
						<div style={{display:'flex', justifyContent:'flex-end'}}>
							{showButton && <div className='submitButton' onClick={() => setShowForm(true)}>등록하기</div>}
						</div>
					</div>
				)}
			</div>
		</div>
		);
};

export default NoticeList;

