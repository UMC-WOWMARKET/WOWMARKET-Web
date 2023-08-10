import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import GoodsAdd from "../components/GoodsAdd";
import Calendar from "../components/Calendar";
import Option from "../components/Option";
import axios from "axios";

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
    // Mock 데이터를 가져오기
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
  const handleRecieveChange = (e) => {
    setReceiveType(e);
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    const combinedData = {
      ...data,
      category_id: selectedCategory,
      item,
      start_date,
      end_date,
      recieve_type,
    };
    //useform으로 받은 data 말고도 외부 컴포넌트로 받은 데이터도 함께 처리

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
            <InputImage type="file" name="thumbnail" accept="image/*" />
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
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
            />
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
            <Option onRecieveChange={handleRecieveChange}/>
            <br />
          </InputCell>

          <InputCell>
            <Label>입금계좌 * </Label>
            <input name="account" {...register("account", { required: true })}/>
          </InputCell>
          
          <InputCell>
            <Label>예금주 * </Label>
            <input name="account_holder_name" {...register("account_holder_name", { required: true })}/>
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

const InputImage = styled.input`
  margin: 10px;
`;

const Date = styled.div``;
