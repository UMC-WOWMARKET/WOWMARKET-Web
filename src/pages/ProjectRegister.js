import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoodsAdd from "../components/register/GoodsAdd";
import Calendar from "../components/register/Calendar";
import useImageUploader from "../\bhooks/useImageUploader";
import ReceiveType from "../components/register/ReceiveType";
import theme from "../styles/Theme";

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
  const [item, setItem] = useState(null);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [recieve_type, setReceiveType] = useState(null);
  const [address, setAddress] = useState(null);
  const [delivery_fee, setDeliveryFee] = useState(null);
  const [selectedBank, setSelectedBank] = useState(banks[-1]);


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
  const handleRecieveChange = (e) => {
    setReceiveType(e);
  };
  const handleAddressChange = (e) => {
    setAddress(e);
  };
  const handleDeliveryFeeChange = (e) => {
    setDeliveryFee(e);
  };
  const handleOptionChange = (e) => {
    setSelectedBank(e.target.value);
  };
  const { handleImageUpload, uploaded, desiredUrl } = useImageUploader();

  const handleImageSubmit = async (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    await handleImageUpload(selectedFile);
    console.log(desiredUrl);
  };


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
    } //택배 선택시 adress 넘기지 않음 (이미 작성되어있던 내용이 있어도 넘기지 않음 )

    if (delivery_fee !== null){
      combinedData.delivery_fee = delivery_fee;
    } else {
      delete combinedData.delivery_fee;
    } //장소 지정 선택시 delivery_fee 넘기지 않음 (이미 작성되어있던 내용이 있어도 넘기지 않음 )

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
      const response = await axios.post(
        "http://13.125.190.15:8080/wowmarket/register/project",
        combinedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    <form
      onSubmit={handleSubmit(onSubmit)} //중복 제출 방지 - 시간 지연
    >
      <RegisterFormContainer>
        <Title>판매 등록폼</Title>
        <InputCell>
          <Label>
            프로젝트 제목 *<span>공백포함 20자 이내</span>
          </Label>
          <InputRegister
            name="project_name"
            placeholder="프로젝트 제목을 작성해주세요 ex. 한정판) oo대 터줏대감 학사모 와움이 인형"
            maxLength={20}
            {...register("project_name", { required: true })}
          />
        </InputCell>

        <InputCell>
          <Label>
            굿즈 설명 *<span>공백포함 60자 이내</span>
          </Label>
          <InputRegister
            name="description"
            maxLength={60}
            {...register("description", { required: true })}
          />
        </InputCell>

        <InputCell>
          <Label>대표 이미지 *</Label>
          <StyledFileInput
            type="file"
            accept="image/*"
            onChange={handleImageSubmit}
          />
          <br />
        </InputCell>

        <InputSpanCell>
          <Label>카테고리 *</Label>
          <br />
          <Select value={selectedCategory} onChange={handleCategoryChange} required>
            <option value="">====선택====</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </InputSpanCell>

        <InputCell>
          <br />
          <Label>굿즈 등록 *</Label>
          <GoodsAdd onGoodsAdd={handleGoodsAdd} />
        </InputCell>

        <InputCell>
          <Label>
            굿즈 소개 첨부 파일 *<span>최대 3개 첨부 가능</span>
          </Label>
          <StyledFileInput
            type="file"
            accept="image/*"
            onChange={handleImageSubmit}
            multiple
          />
          <br />
        </InputCell>

        <InputCell>
          <br />
          <Label>진행 기간 *<span>2달 이내의 기간을 선택해주세요</span></Label>
          <Date>
            <Calendar
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </Date>
        </InputCell>

        <InputSpanCell>
          <LabelSpan>수령방법 * </LabelSpan>
          <ReceiveType
            onRecieveChange={handleRecieveChange}
            onAddressChange={handleAddressChange}
            onDeliveryFeeChange={handleDeliveryFeeChange}
          />
          <br />
        </InputSpanCell>

        <InputSpanCell>
          <br />
          <LabelSpan>입금계좌 * </LabelSpan>
          <Select value={selectedBank} onChange={handleOptionChange} required>
            <Option value="">은행</Option>
            {banks.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
          <InputSmall
            name="account"
            {...register("account", { required: true })}
          />
        </InputSpanCell>

        <InputSpanCell>
          <br />
          <LabelSpan>예금주 * </LabelSpan>
          <InputSmall
            name="account_holder_name"
            {...register("account_holder_name", { required: true })}
          />
          <br />
        </InputSpanCell>

        <InputSpanCell>
          <br />
          <LabelSpan>프로젝트 담당자명 * </LabelSpan>
          <InputSmall
            name="nickname"
            {...register("nickname", { required: true })}
          />
        </InputSpanCell>
        <br />
        <InputCell>
          <Label>
            {" "}
            <Checkbox
              type="checkbox"
              required
            />
            개인정보 수집 및 이용 동의 (필수)
          </Label>
          <ScrollableContainer>
            <p>{TermsContent1}</p>
          </ScrollableContainer>
        </InputCell>

        <InputCell>
          <Label>
            {" "}
            <Checkbox
              type="checkbox"
              required
            />
            판매자 유의사항 동의 (필수)
          </Label>
          <ScrollableContainer>
            <p>{TermsContent2}</p>
          </ScrollableContainer>
        </InputCell>
      </RegisterFormContainer>
      <SubmitButton type="submit" disabled={isSubmitting}>
        등록하기
      </SubmitButton>
    </form>
  );
};

export default ProjectRegister;

const RegisterFormContainer = styled.div`
  border: solid 0.5px ${theme.colors.lightgrey};
  width: 800px;
  margin: 0 auto;
  padding: 60px;
  margin-top: 205px;
  color: ${theme.colors.darkgrey};
  font-family: "Pretendard";
`;

const Title = styled.div`
  border-bottom: 1px solid ${theme.colors.lightgrey};
  width: 800px;
  padding-bottom: 25px;
  margin: auto;
  font-weight: 600;
  font-size: ${theme.fontSizes.headline1};
  text-align: left;
  color: ${theme.colors.darkgrey};
`;

const InputCell = styled.div`
  width: 800px;
  margin: auto;
  color: ${theme.colors.darkgrey};
`;

const InputSpanCell = styled.div`
  width: 800px;
  height: 40px;
  text-align: left;
  paddin: 0;
  margin: 18px 0;
  color: ${theme.colors.darkgrey};
`;

const Label = styled.div`
  text-align: left;
  margin-top: 28px;
  font-weight: 500;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  span {
    font-weight: 400;
    color: ${theme.colors.grey};
    margin-left: 8px;
    font-size: 12px;
  }
`;

const LabelSpan = styled.span`
  text-align: left;
  margin-top: 28px;
  margin-left: 0;
  font-weight: 500;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  width: 72px;
`;

const InputRegister = styled.input`
  margin-top: 12px;
  padding-left: 15px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: ${theme.colors.lightgrey};
  }
`;

const StyledFileInput = styled.input`
  float: left;
  margin: 12px 0;
`;

const Date = styled.div`
  margin-top: 10px;
`;

const InputSmall = styled.input`
  padding-left: 15px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  font-size: 16px;
  padding-left: 15px;
  margin-left: 8px;
  widht: 332px;
  height: 36px;
  color: ${theme.colors.darkgrey};
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: solid 1px ${theme.colors.lightgrey};
  width: 145px;
  height: 40px;
  color: ${theme.colors.darkgrey};
`;

const Option = styled.option`
  font-size: 14px;
  color: ${theme.colors.darkgrey};
`;

const SubmitButton = styled.button`
  color: ${theme.colors.white};
  border-radius: 5px;
  width: 400px;
  height: 60px;
  font-size: 20px;
  font-weight: 700;
  margin-top: 20px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  background-color: ${(props) => (props.disabled ? "#a0a0a0" : "#002472")};
`;

const Checkbox = styled.input`
  margin-right: 8px;
  accent-color: ${theme.colors.primaryColor};
`;

const ScrollableContainer = styled.div`
  width: 800px;
  height: 45px;
  overflow: auto;
  border: 1px solid ${theme.colors.lightgrey};
  padding: 10px;
  margin: 10px 0;
  text-align: left;
`;

const TermsContent1 = `
  서비스 이용 약관의 내용은 다음과 같으며 이를 제공하였으니 잘 읽어보아야한다. 내용내용내용 내용은 내용 내용이다.서비스 이용 약관의 내용은 다음과 같으며 이를 제공하였으니 잘 읽어보아야한다. 내용내용내용 내용은 내용 내용이다.
`;

const TermsContent2 = `
  판매자 유의사항 동의 내용은 다음과 같으며 이를 제공하였으니 잘 읽어보아야한다. 내용내용내용 내용은 내용 내용이다.서비스 이용 약관의 내용은 다음과 같으며 이를 제공하였으니 잘 읽어보아야한다. 내용내용내용 내용은 내용 내용이다.
`;
