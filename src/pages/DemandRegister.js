import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoodsAdd from "../components/register/GoodsAdd";
import Calendar from "../components/register/Calendar";
import ImageUploader from "../components/register/ImageUploader";

const DemandRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  //register()로 각 입력란 등록, handleSubmit()로 submit 이벤트 처리

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [item, setItem] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);


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


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleGoodsAdd = (e) => {
    setItem(e);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e);
  };
  const handleImageUrlUploaded = (e) => {
    setThumbnail(e);
  }

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    const combinedData = {
      ...data,
      category_id: selectedCategory,
      item,
      start_date,
      end_date,
      thumbnail,
    };
    //useform으로 받은 data 말고도 외부 컴포넌트로 받은 데이터도 함께 처리

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        console.log(userAccessToken);
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.post("http://13.125.190.15:8080/wowmarket/register/demand", combinedData, {
        headers: {
          "Content-Type": "application/json",
        }
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
    <div className="DemandRegister">
      수요조사 등록폼
      <RegisterFormContainer>
        <form
          onSubmit={handleSubmit(onSubmit)} //중복 제출 방지 - 시간 지연
        >
          <InputCell>
            <Label>수요조사 등록명 *</Label>
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
            <GoodsAdd onGoodsAdd={handleGoodsAdd} />
          </InputCell>

          <InputCell>
            <Label>굿즈 소개 첨부 파일 *</Label>
            <input type="file" name="image" accept="image/*" multiple />
          </InputCell>

          <InputCell>
            <Label>진행 기간 *</Label>
            <Date>
              <Calendar
                onStartDateChange={handleStartDateChange}
                onEndDateChange={handleEndDateChange}
              />
            </Date>
          </InputCell>

          <InputCell>
            <label>프로젝트 담당자명 * </label>
            <input
              name="nickname"
              {...register("nickname", { required: true })}
            />
          </InputCell>
          <br />
          <button type="submit" disabled={isSubmitting}>등록하기</button>
        </form>
      </RegisterFormContainer>
    </div>
  );
};

export default DemandRegister;

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
