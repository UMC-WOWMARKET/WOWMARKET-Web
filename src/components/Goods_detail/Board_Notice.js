import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/GoodsBoard.css";

const NoticeForm = ({ onSubmit }) => {
  //for POST
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && content) {
      onSubmit(title, content);
      setTitle("");
      setContent("");
    } else {
      window.alert("제목과 내용을 입력하세요.");
    }
  };

  return (
    <div className="noticeForm">
      <input
        type="text"
        id="title"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ height: "52px", paddingLeft: "15px" }}
      />
      <textarea
        id="content"
        placeholder="공지 내용을 작성해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          height: "145px",
          marginTop: "11px",
          paddingLeft: "15px",
          paddingTop: "15px",
        }}
      />
      {/* <button onClick={handleSubmit}>작성완료</button> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <div className="submitButton" onClick={handleSubmit}>
          등록하기
        </div>
      </div>
    </div>
  );
};

// 공지 아이템 컴포넌트
const NoticeItem = ({ key, goods_id, notice_id, index, title, time }) => {
  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState(false);

  const getContent = async () => {
    try {
      const response = await axios.get(
        `https://www.wowmkt.kr/project/${goods_id}/notice/${notice_id}`
      );
      setContent(response.data.content);
      console.log("notice content GET Success");
      console.log(content);
    } catch (error) {
      console.error("notice content GET Error:", error);
    }
  };

  useEffect(() => {
    getContent();
  }, [goods_id]); //GET

  const handleToggleContent = () => {
    setShowContent(!showContent);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <div
        className="noticeItem"
        key={key}
        onClick={handleToggleContent}
        style={{ cursor: "pointer", margin: "13px 35px 13px 35px" }}
      >
        <div style={{ display: "flex", width: "80px" }}>{index + 1}</div>
        <div style={{ display: "flex", width: "320px" }}>{title}</div>
        <div style={{ display: "flex" }}>{formatDate(time)}</div>
      </div>
      {showContent && <div className="content">{content}</div>}
      <div
        className="common-box"
        style={{ width: "560px", height: "0px" }}
      ></div>
    </div>
  );
};

// 공지 목록 컴포넌트
const NoticeList = ({ goods_id }) => {
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(false);
  //for GET
  const [posts, setPosts] = useState([]);

  const getList = async () => {
    try {
      const response = await axios.get(
        `https://www.wowmkt.kr/project/${goods_id}/notice`
      );
      setPosts(response.data.noticeLists);
      console.log(response.data);

      const fetchedUserId = response.data.user_id;
      const fetchedSellerId = response.data.seller_id;
      console.log(fetchedUserId);
      console.log(fetchedSellerId);

      if (
        fetchedUserId &&
        fetchedSellerId &&
        fetchedUserId === fetchedSellerId
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      console.log("notice GET Success");
      console.log(posts);
    } catch (error) {
      console.error("notice GET Error:", error);
    }
  };

  useEffect(() => {
    getList();
  }, [goods_id]); //GET

  const handleAddPost = async (title, content) => {
    //POST
    const postData = {
      title: title,
      content: content,
    };
    console.log(postData);
    try {
      await axios.post(
        `https://www.wowmkt.kr/project/${goods_id}/notice`,
        postData
      );
      getList();
      console.log("notice POST Success");
    } catch (error) {
      console.error("Notice POST Error:", error);
    }
    setShowForm(false);
  };

  return (
    //GET
    <div className="Notice">
      <div>
        {showForm ? (
          <NoticeForm onSubmit={handleAddPost} />
        ) : (
          <div>
            <div
              className="common-box"
              style={{ flexDirection: "column", paddingBottom: "20px" }}
            >
              <div style={{ width: "560px" }}>
                <div className="flex-row">
                  <div style={{ display: "flex", width: "80px" }}>번호</div>
                  <div style={{ display: "flex", width: "320px" }}>제목</div>
                  <div style={{ display: "flex" }}>작성일</div>
                </div>
              </div>

              <div
                className="common-box"
                style={{ width: "560px", height: "0px" }}
              ></div>
              {posts
                .slice()
                .reverse()
                .map((post, index, array) => (
                  <NoticeItem
                    key={post.notice_id}
                    goods_id={goods_id}
                    notice_id={post.notice_id}
                    index={array.length - 1 - index} // 역순 index 계산
                    title={post.title}
                    time={post.createdTime}
                  />
                ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              {showButton && (
                <div className="submitButton" onClick={() => setShowForm(true)}>
                  등록하기
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
