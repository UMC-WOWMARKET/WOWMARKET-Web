import React from 'react';
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
  
  return <div className="DemandRegister">
    수요조사 등록폼
    <RegisterFormContainer>
    <form onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log(data);
        console.log(errors);
      })} //중복 제출 방지 - 시간 지연
      >
      <div>수요조사 등록명 *</div>
      <InputRegister name="title" placeholder="구매자의 흥미를 불러올 수 있는 이름을 설정해주세요. ex [2차] 한정판 눈송이 x 와우 콜라보 인형 판매" {...register("title", { required: true })} />
      <div>굿즈 설명 *</div>
      <InputRegister name="detail" {...register("detail", { requried: true})} />
      <div>대표 이미지 *</div>
      <InputImage type="file" name="main_image" {...register("main_image", { requried: true})}/>
      <div>카테고리 *</div>
      <select>
        <option value="clothing">의류</option>
        <option value="staitonery">문구</option>
        <option value="sticker">스티커</option>
        <option value="doll">인형</option>
        <option value="pinbutton">뱃지</option>
        <option value="etc">기타</option>
      </select>
      <div>굿즈 등록 *</div>
      <GoodsAdd></GoodsAdd>
      <div>굿즈 소개 첨부 파일 *</div>
      <InputImage type="file" name='detail_image' {...register('detail_image')} />
      <div>진행 기간 *</div>
      <Date>
        <div>날짜 선택</div>
        <Calendar />
      </Date>
      <input type="submit" disabled={isSubmitting} />
      {errors.title && alert('필수 입력사항을 모두 입력해주세요')}
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

const InputRegister = styled.input`
  margin: 10px;
  border-radius: 20px;
  width: 80%;
`

const InputImage = styled.input`
  width: 300px;
  margin: 10px;
`

const Date = styled.div`
`