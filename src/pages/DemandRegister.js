import React from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useForm } from 'react-hook-form';

const DemandRegister = () => {
  const {
    register,
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  
  return <div className="DemandRegister">수요조사 등록폼
    <RegisterFormContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>수요조사 등록명 *</div>
      <InputRegister name="name" placeholder="구매자의 흥미를 불러올 수 있는 이름을 설정해주세요. ex [2차] 한정판 눈송이 x 와우 콜라보 인형 판매" {...register('name')} />
      <div>굿즈 설명 *</div>
      <InputRegister name="detail" {...register('detail')} />
      <div>대표 이미지 *</div>
      <InputImage type="file" name='images' {...register('image')}/>
      <div>카테고리 *</div>
      <select>
        <option></option>
      </select>
      <div>굿즈 등록 *</div>
      <Product>
        <ProductDetail>
          <div>굿즈 이름</div>
          <input {...register('productName', { required: '이메일을 입력해주세요' })} />
        </ProductDetail>
        <ProductDetail>
          <div>판매 금액</div>
          <input />
        </ProductDetail>
        <ProductDetail>
          <div>목표 수량</div>
          <input />
        </ProductDetail>
        <button>+</button>
      </Product>
      <div>굿즈 소개 첨부 파일 *</div>
      <InputImage type="file"></InputImage>
      <div>진행 기간 *</div>
      <Date>
        <div>날짜 선택</div>
        <Calendar />
      </Date>
      <input type="submit" />
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
`

const Product = styled.div`
  
`

const ProductDetail = styled.div`
  display: inline-block;
  margin: 5px;
`

const Date = styled.div`
`