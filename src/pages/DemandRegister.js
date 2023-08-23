import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from "axios";
import GoodsAdd from "../components/register/GoodsAdd";
import Calendar from "../components/register/Calendar";
//import useImageUploader from "../hooks/useImageUploader";
import theme from "../styles/Theme";
import { Privacy_policy } from "../Terms/terms";

const DemandRegister = ({ ImageUrlUploaded }) => {
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
  const [thumbnail, setThumbnail] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");

  const handleImageUpload1 = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      const presignedUrl = response.data;
      console.log("원래 주소", presignedUrl);

      const parts = presignedUrl.split("?");
      const desiredPart = parts[0];
      setThumbnail(desiredPart);

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  const handleImageUpload2 = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      const presignedUrl = response.data;
      console.log("원래 주소", presignedUrl);

      const parts = presignedUrl.split("?");
      const desiredPart = parts[0];
      setImage1(desiredPart);

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  const handleImageUpload3 = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      const presignedUrl = response.data;
      console.log("원래 주소", presignedUrl);

      const parts = presignedUrl.split("?");
      const desiredPart = parts[0];
      setImage2(desiredPart);

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  const handleImageUpload4 = async (selectedFile) => {
    if (!selectedFile) {
      console.error("파일이 선택되지 않았습니다.");
      return;
    }

    axios.interceptors.request.use((config) => {
      /* JWT 토큰 */
      const userAccessToken = localStorage.getItem("accessToken");
      if (userAccessToken) {
        config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
      }

      return config;
    });

    try {
      const response = await axios.get(
        "https://www.wowmkt.kr/register/image?dirname=demand"
      );
      const presignedUrl = response.data;
      console.log("원래 주소", presignedUrl);

      const parts = presignedUrl.split("?");
      const desiredPart = parts[0];
      setImage3(desiredPart);

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

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

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 1000));
    const combinedData = {
      ...data,
      category_id: selectedCategory,
      item,
      start_date,
      end_date,
      thumbnail,
      image1,
      image2,
      image3,
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
      const response = await axios.post(
        "https://www.wowmkt.kr/register/demand",
        combinedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data submitted successfully!");
        window.alert("성공적으로 등록되었습니다.");
        window.location.href = "/goods?page_type=demand";
      } else {
        console.error("Failed to submit data.");
        window.alert("등록에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(combinedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RegisterFormContainer>
        <Title>수요조사 등록폼</Title>
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
            onChange={(event) => handleImageUpload1(event.target.files[0])}
          />
          <br />
          <br />
        </InputCell>

        <InputSpanCell>
          <Label>카테고리 *</Label>
          <br />
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
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
            굿즈 소개 첨부 파일 *<span>최소 1개 최대 3개 첨부 가능</span>
          </Label>
          <Inputs>
            <StyledFileInput
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload2(event.target.files[0])}
              multiple
            />
            <StyledFileInput
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload3(event.target.files[0])}
              multiple
            />
            <StyledFileInput
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload4(event.target.files[0])}
              multiple
            />
          </Inputs>
        </InputCell>

        <InputCell>
          <Label>
            진행 기간 *<span>2달 이내의 기간을 선택해주세요</span>
          </Label>
          <Date>
            <Calendar
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
          </Date>
        </InputCell>

        <InputSpanCell>
          <LabelSpan>프로젝트 담당자명 * </LabelSpan>
          <InputSmall
            name="nickname"
            {...register("nickname", { required: true })}
          />
        </InputSpanCell>

        <InputCell>
          <Label>
            {" "}
            <Checkbox type="checkbox" required />
            수요조사 등록 유의사항 동의 (필수)
          </Label>
          <ScrollableContainer>
            <p>{Privacy_policy}</p>
          </ScrollableContainer>
        </InputCell>
      </RegisterFormContainer>
      <SubmitButton type="submit" disabled={isSubmitting}>
        등록하기
      </SubmitButton>
    </form>
  );
};

export default DemandRegister;

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

const Inputs = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
`;

const StyledFileInput = styled.input`
  float: left;
  margin: 12px 0;
  width: 300px;
`;

const Date = styled.div`
  margin-top: 10px;
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
