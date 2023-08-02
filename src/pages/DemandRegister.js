import React, {useState} from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import GoodsAdd from "../components/GoodsAdd";
import Calendar from "../components/Calendar";
import axios from "axios";

const DemandRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  //register()로 각 입력란 등록, handleSubmit()로 submit 이벤트 처리

  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  //카테고리 선택 관련

  const submitFunction = (e) => {
    console.log(e);
  };

  return (
    <div className="DemandRegister">
      수요조사 등록폼
      <RegisterFormContainer>
        <form
          id="post-form"
          onSubmit={handleSubmit(async (data) => {
            await new Promise((r) => setTimeout(r, 1000));
            console.log(data);
            console.log(Selected);
          })} //중복 제출 방지 - 시간 지연
        >
          <InputCell>
            <Label>수요조사 등록명 *</Label>
            <InputRegister
              name="title"
              placeholder="구매자의 흥미를 불러올 수 있는 이름을 설정해주세요. ex [2차] 한정판 눈송이 x 와우 콜라보 인형 판매"
              {...register("title")}
            />
          </InputCell>

          <InputCell>
            <Label>굿즈 설명 *</Label>
            <InputRegister name="detail" {...register("detail")} />
          </InputCell>

          <InputCell>
            <Label>대표 이미지 *</Label>
            <InputImage
              type="file"
              name="main_image"
              accept="image/*"
              {...register("main_image")}
            />
          </InputCell>

          <InputCell>
            <Label>카테고리 *</Label>
            <select onChange={handleSelect} value={Selected}>
              <option>===선택하세요===</option>
              <option value="clothing">의류</option>
              <option value="staitonery">문구</option>
              <option value="sticker">스티커</option>
              <option value="doll">인형</option>
              <option value="pinbutton">뱃지</option>
              <option value="etc">기타</option>
            </select>
          </InputCell>

          <InputCell>
            <Label>굿즈 등록 *</Label>
            <GoodsAdd submitFunction={submitFunction} />
          </InputCell>

          <InputCell>
            <Label>굿즈 소개 첨부 파일 *</Label>
            <InputImage
              type="file"
              name="detail_image"
              {...register("detail_image")}
            />
          </InputCell>

          <InputCell>
            <Label>진행 기간 *</Label>
            <Date>
              <label>날짜 선택</label>
              <Calendar />
            </Date>
          </InputCell>
          
          <InputCell>
            <label>프로젝트 담당자명 * </label>
            <input name="manager" {...register("manager")} />
          </InputCell>

          <input type="submit" disabled={isSubmitting} />
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

const InputImage = styled.input`
  margin: 10px;
`;

const Date = styled.div`
`;
