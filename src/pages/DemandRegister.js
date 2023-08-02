import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useForm } from 'react-hook-form';
import GoodsAdd from '../components/GoodsAdd';

const DemandRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm(); 
  //register()로 각 입력란 등록, handleSubmit()로 submit 이벤트 처리
  
  const [Selected, setSelected] = useState("");
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  //카테고리 선택 관련

  return <div className="DemandRegister">
    수요조사 등록폼
    <RegisterFormContainer>
    <form onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log(data);
        console.log(Selected);
        //console.log(errors);
      })} //중복 제출 방지 - 시간 지연
      >
      <InputCell>
        <Label>수요조사 등록명 *</Label>
        <InputRegister name="title" placeholder="구매자의 흥미를 불러올 수 있는 이름을 설정해주세요. ex [2차] 한정판 눈송이 x 와우 콜라보 인형 판매" {...register("title", { required: true })} />
      </InputCell>

      <InputCell>
        <Label>굿즈 설명 *</Label>
        <InputRegister name="detail" {...register("detail", { requried: true })} />
      </InputCell>

      <InputCell>
        <Label>대표 이미지 *</Label>
        <InputImage type="file" name="main_image" accept="image/*" {...register("main_image", { requried: true})} />
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
        <GoodsAdd />
      </InputCell>

      <InputCell>
        <Label>굿즈 소개 첨부 파일 *</Label>
        <InputImage type="file" name='detail_image' {...register('detail_image')} />
      </InputCell>

      <InputCell>
        <Label>진행 기간 *</Label>
        <Date>
          <div>날짜 선택</div>
          <Calendar />
        </Date>
        <input type="submit" disabled={isSubmitting} />
      </InputCell>

    </form>
    </RegisterFormContainer>
  </div>;
};

export default DemandRegister;

const RegisterFormContainer = styled.div`
  border: solid 0.5px;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`

const InputCell = styled.div`
  width: 80%;
  margin: auto;
`

const Label = styled.div`
  text-align: left;
  margin: 10px;
`

const InputRegister = styled.input`
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  border: solid 1px;
  width: 100%;
  height: 25px;
`

const InputImage = styled.input`
  margin: 10px;
`

const Date = styled.div`
  margin: 10px;
`