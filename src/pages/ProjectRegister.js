import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import GoodsAdd from "../components/register/GoodsAdd";
import Calendar from "../components/register/Calendar";
import Option from "../components/register/Option";
import ImageUploader from "../components/register/ImageUploader";
import axios from "axios";

const banks = [
  "KB국민",
  "IBK기업",
  "NH농협",
  "신한",
  "카카오뱅크",
  "씨티",
  "SC제일",
  "우리",
  "외환",
  "케이뱅크",
  "토스뱅크",
  "하나",
  "경남",
  "광주",
  "대구",
  "부산",
  "KDB산업",
  "수협",
  "우체국",
  "전북",
  "제주",
  "새마을금고",
  "신협",
  "서울",
  "농협중앙회",
  "SBI저축",
  "저축",
];

const ProjectRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  //register()로 각 입력란 등록, handleSubmit()로 submit 이벤트 처리

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    // Mock 데이터를 가져옴
    axios
      .get("/categories.json")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  //카테고리

  let item = [];
  const submitFunction = (e) => {
    item = e;
  };
  //GoodsAdd.js 값 -> item 배열로

  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  //Calander -> start_date, end_date

  const [recieve_type, setReceiveType] = useState(null);
  const [address, setAddress] = useState(null);
  const handleRecieveChange = (e) => {
    setReceiveType(e);
  };
  const handleAddressChange = (e) => {
    setAddress(e);
  };
  //Option -> 수령방법 가져오기

  const [selectedBank, setSelectedBank] = useState(banks[-1]);
  const handleOptionChange = (event) => {
    setSelectedBank(event.target.value);
  };
  //은행 선택 관련

  const [thumbnail, setThumbnail] = useState(null);
  const handleImageUrlUploaded = (e) => {
    setThumbnail(e);
  }
  //이미지 업로드

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    const combinedData = {
      ...data,
      bank: selectedBank,
      category_id: selectedCategory,
      item,
      start_date,
      end_date,
      recieve_type,
      thumbnail,
    };
    //useform으로 받은 data 말고도 외부 컴포넌트로 받은 데이터도 함께 처리

    if (address !== null) {
      combinedData.address = address;
    } else {
      delete combinedData.address;
    }//택배 선택시 adress 넘기지 않음 (이미 작성되어있던 내용이 있어도 넘기지 않음 )

    try {
      const response = await axios.post("/api/submit", combinedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(combinedData);
  };

  return (
    <div className="ProjectRegister">
      판매 등록폼
      <RegisterFormContainer>
        <form
          onSubmit={handleSubmit(onSubmit)} //중복 제출 방지 - 시간 지연
        >
          <InputCell>
            <Label>프로젝트 등록명 *</Label>
            <InputRegister
              name="project_name"
              placeholder="구매자의 흥미를 불러올 수 있는 이름을 설정해주세요. ex [2차] 한정판 눈송이 x 와우 콜라보 인형 판매"
              {...register("project_name", { required: true })}
            />
          </InputCell>

          <InputCell>
            <Label>굿즈 설명 *</Label>
            <InputRegister
              name="description"
              {...register("description", { required: true })}
            />
          </InputCell>

          <InputCell>
            <Label>대표 이미지 *</Label>
            <ImageUploader ImageUrlUploaded={handleImageUrlUploaded} />
          </InputCell>

          <InputCell>
            <Label>카테고리 *</Label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">===선택===</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </InputCell>

          <InputCell>
            <Label>굿즈 등록 *</Label>
            <GoodsAdd submitFunction={submitFunction} />
          </InputCell>

          <InputCell>
            <Label>굿즈 소개 첨부 파일 *</Label>
            <input type="file" name="image" accept="image/*" multiple />
          </InputCell>

          <InputCell>
            <Label>진행 기간 *</Label>
            <Date>
              <label>날짜 선택</label>
              <Calendar
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
              />
            </Date>
          </InputCell>

          <InputCell>
            <Label>수령방법 * </Label>
            <Option
              onRecieveChange={handleRecieveChange}
              onAddressChange={handleAddressChange}
            />
            <br />
          </InputCell>

          <InputCell>
            <Label>입금계좌 * </Label>
            <select value={selectedBank} onChange={handleOptionChange}>
              <option value="">은행</option>
              {banks.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              name="account"
              {...register("account", { required: true })}
            />
          </InputCell>

          <InputCell>
            <Label>예금주 * </Label>
            <></>
            <input
              name="account_holder_name"
              {...register("account_holder_name", { required: true })}
            />
            <br />
          </InputCell>

          <InputCell>
            <Label>프로젝트 담당자명 * </Label>
            <input
              name="nickname"
              {...register("nickname", { required: true })}
            />
          </InputCell>

          <input type="submit" disabled={isSubmitting} />
        </form>
      </RegisterFormContainer>
    </div>
  );
};

export default ProjectRegister;

const RegisterFormContainer = styled.div`
  border: solid 0.5px;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`;

const InputCell = styled.div`
  width: 80%;
  margin: auto;
`;

const Label = styled.div`
  text-align: left;
  margin: 10px;
`;

const InputRegister = styled.input`
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  border: solid 1px;
  width: 100%;
  height: 25px;
`;

const Date = styled.div``;
