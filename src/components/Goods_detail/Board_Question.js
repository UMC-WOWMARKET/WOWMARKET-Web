import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/GoodsBoard.css';

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
		<div className='noticeForm'>
			<div>
				<input
					type="text"
					id="title"
					placeholder="제목을 입력해주세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					style={{height:'52px'}}
				/>
			</div>
			<div>
				<textarea
					id="content"
					placeholder="문의 내용을 작성해주세요"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					style={{height:'145px', marginTop:'11px'}}
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
			<div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
				<div className='submitButton' onClick={handleSubmit}>등록하기</div>
			</div>
		</div>
	);
};

//문의 아이템
const QuestionItem = ({key, goods_id, question_id, index, title, writer, time}) => {
	const [content, setContent] = useState("");
	const [showContent, setShowContent] = useState(false);
	const [answer, setAnswer] = useState(null);
	const [answerText, setAnswerText] = useState("");
	const [isSeller, setIsSeller] = useState(false);

	const getContent = async () => {
		try {
			const response = await axios.get(`http://www.wowmkt.kr/project/${goods_id}/question/${question_id}`);
			setContent(response.data.content);

			const userId = response.data.user_id;
			const sellerId = response.data.seller_id;
			console.log("user: " + userId);
			console.log("seller: " + sellerId);

			if (userId && sellerId && userId === sellerId){
				setIsSeller(true);
			}

			if (userId != null && sellerId != null) {
				const answerContents = response.data.answerResponseDto;
				let answerContent = null;

				if (answerContents !== null) {
					answerContent = answerContents.content;
					setAnswer(answerContent);
				}

				setAnswer(answerContent);
				console.log(answer);
			}

			console.log('question content GET Success');
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

	const handleAnswerChange = (event) => {
		setAnswerText(event.target.value);
	};

	const handleSubmitAnswer =  async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(`http://www.wowmkt.kr/project/${goods_id}/question/${question_id}`, {content:answerText});
			setAnswer(response.data.content);
			setAnswerText("");
		} catch (error) {
			console.error('Answer submission error:', error);
		}
	};

	return (
		<div>
			<div className='noticeItem' key={key} onClick={handleToggleContent} style={{cursor:'pointer', margin:'13px 35px 13px 35px'}}>
				<div style={{display:'flex', flex:1}}>{index + 1}</div>
				<div style={{display:'flex', flex:2, flexWrap:'wrap'}}>{title}</div>
				<div style={{display:'flex', flex:1}}>{writer}</div>
				<div style={{display:'flex', flex:1}}>{formatDate(time)}</div>
			</div>
			{showContent && (
				<div>
					<div className='content'>{content}</div>
					{answer !== null ? <div className='answer'>{answer}</div> : (isSeller &&
						<div>
							<textarea
								rows="4"
								cols="50"
								value={answerText}
								onChange={handleAnswerChange}
							/>
							<button onClick={handleSubmitAnswer}>답변 제출</button>
						</div>
					)}
				</div>
			)}
			<div className='common-box' style={{width:'560px', height:'0px'}}></div>

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
		<div className='Question'>
<div>
	{showForm ? (
			<QuestionForm onSubmit={handleAddPost} />
	) : (
		<div>
			<div className='common-box' style={{flexDirection:'column', paddingBottom:'20px'}}>
				<div className='flex-row'>
					<div style={{display:'flex', flex:1}}>번호</div>
					<div style={{display:'flex', flex:2}}>제목</div>
					<div style={{display:'flex', flex:1}}>작성자</div>
					<div style={{display:'flex', flex:1}}>작성일</div>
				</div>
				<div className='common-box' style={{width:'560px', height:'0px'}}></div>
				{posts.map((post, index) => (
					<QuestionItem
						key={post.id}
						goods_id={goods_id}
						question_id={post.id}
						index={index}
						title={post.title}
						writer={post.writer}
						secret={post.secret}
						time={post.createdTime}
					/>
				))}
			</div>
			<div style={{display:'flex', justifyContent:'flex-end', marginTop:'20px'}}>
				<div className='submitButton' onClick={() => setShowForm(true)}>등록하기</div>
			</div>
		</div>
	)}
</div>
</div>
	);
};

export default QuestionList;
