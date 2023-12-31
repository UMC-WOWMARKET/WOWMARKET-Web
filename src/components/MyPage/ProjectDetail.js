import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";
import { CalendarContainer } from "react-datepicker";

const ProjectDetail = ({ project_id, handleProjectClick, onGoBack }) => {
  const [projectData, setProjectData] = useState(null); // 프로젝트 데이터 상태

  //토큰
  axios.interceptors.request.use((config) => {
    const userAccessToken = localStorage.getItem("accessToken");
    if (userAccessToken) {
      console.log(userAccessToken);
      config.headers["X-ACCESS-TOKEN"] = `${userAccessToken}`;
    }
    return config;
  });

  useEffect(() => {
    axios
      .get(`https://www.wowmkt.kr/mypage/myproject/detail/${project_id}`)
      .then((response) => {
        setProjectData(response.data);
      })
      .catch((error) => {
        console.error("데이터 불러오기 실패", error);
      });
  }, [project_id]);

  return (
    <div>
      {projectData ? (
        <div>
          <RegisterFormContainer>
            <Title>판매 등록폼</Title>
            <InputCell>
              <Label>
                프로젝트 제목 *<span>공백포함 20자 이내</span>
              </Label>
              <InputRegister
                name="project_name"
                value={projectData.projectname}
                readOnly
              />
            </InputCell>

            <InputCell>
              <Label>
                굿즈 설명 *<span>공백포함 60자 이내</span>
              </Label>
              <InputRegister
                name="description"
                value={projectData.description}
                readOnly
              />
            </InputCell>

            <InputCell>
              <Label>대표 이미지 *</Label>
              <br />
            </InputCell>

            <InputSpanCell>
              <Label>카테고리 *</Label>
              <br />
              <Select>
                <option value="">{projectData.category}</option>
              </Select>
            </InputSpanCell>

            <InputCell>
              <br />
              <Label>굿즈 등록 *</Label>
              <GoodsAddContainer>
                <Labels>
                  <LabelName>
                    굿즈 이름
                    <span>공백포함 12자 이내</span>
                  </LabelName>
                  <LabelPrice>판매 금액</LabelPrice>
                  <LabelGoal>목표 수량</LabelGoal>
                </Labels>
                {projectData.itemList.map((item, index) => (
                  <GoodsDetail key={index}>
                    <NameInput id="item_name" value={item.name} readOnly />
                    <PriceInput id="price" value={item.price} readOnly />
                    <GoalInput id="goal" value={item.goal} readOnly />
                  </GoodsDetail>
                ))}
              </GoodsAddContainer>
            </InputCell>

            <InputCell>
              <Label>
                굿즈 소개 첨부 파일 *<span>최대 3개 첨부 가능</span>
              </Label>
              <br />
            </InputCell>

            <InputCell>
              <br />
              <Label>
                진행 기간 *<span>2달 이내의 기간을 선택해주세요</span>
              </Label>
              <Date>
                <CustomCalendarContainer>
                  <DateBox>
                    {projectData.startdate} ~ {projectData.enddate}
                  </DateBox>
                </CustomCalendarContainer>
              </Date>
            </InputCell>

            <InputSpanCell>
              <LabelSpan>수령방법 * </LabelSpan>
              <OptionContainer>
                <label>
                  <Radio
                    type="radio"
                    name="option"
                    value="delivery"
                    checked={projectData?.receive_type === "delivery"}
                  />
                  택배
                </label>
                <Input
                  type="text"
                  value={
                    projectData?.receive_type === "delivery"
                      ? projectData?.delivery_fee
                      : ""
                  }
                  disabled
                  placeholder="택배비 입력(단위: 원)"
                  required
                />
                <label>
                  <Radio
                    type="radio"
                    name="option"
                    value="venue"
                    checked={projectData?.receive_type === "pickup"}
                  />
                  장소 지정
                </label>
                <Input
                  type="text"
                  value={
                    projectData?.receive_type === "pickup"
                      ? projectData?.address
                      : ""
                  }
                  disabled
                  placeholder="수령장소 입력"
                  required
                />
              </OptionContainer>
              <br />
            </InputSpanCell>

            <InputSpanCell>
              <br />
              <LabelSpan>입금계좌 * </LabelSpan>
              <Select>
                <Option value="">{projectData.seller_bank}</Option>
              </Select>
              <InputSmall name="account" value={projectData.seller_account} />
            </InputSpanCell>

            <InputSpanCell>
              <br />
              <LabelSpan>예금주 * </LabelSpan>
              <InputSmall
                name="account_holder_name"
                value={projectData.seller_account_name}
              />
              <br />
            </InputSpanCell>

            <InputSpanCell>
              <br />
              <LabelSpan>프로젝트 담당자명 * </LabelSpan>
              <InputSmall name="nickname" value={projectData.seller_nickname} />
              <br />
            </InputSpanCell>
            <InputCell>
              <Label>
                {" "}
                <Checkbox type="checkbox" checked />
                개인정보 수집 및 이용 동의 (필수)
              </Label>
              <ScrollableContainer>
                <p>{TermsContent1}</p>
              </ScrollableContainer>
            </InputCell>

            <InputCell>
              <Label>
                {" "}
                <Checkbox type="checkbox" checked />
                판매자 유의사항 동의 (필수)
              </Label>
              <ScrollableContainer>
                <p>{TermsContent2}</p>
              </ScrollableContainer>
            </InputCell>
          </RegisterFormContainer>
          <button onClick={onGoBack}>목록</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProjectDetail;

const RegisterFormContainer = styled.div`
  border: solid 0.5px ${theme.colors.lightgrey};
  width: 800px;
  margin-left: 100px;
  padding: 60px;
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

const GoodsAddContainer = styled.div`
  width: 100%;
  font-family: "Pretendard";
  text-align: left;
`;

const Labels = styled.div`
  margin: 10px 0;
  display: flex;
  color: ${theme.colors.darkgrey};
  font-size: 12px;
`;

const LabelName = styled.div`
  width: 320px;
  margin-right: 6px;
  span {
    font-weight: normal;
    color: ${theme.colors.grey};
    margin-left: 8px;
  }
`;

const LabelPrice = styled.div`
  width: 120px;
  margin-right: 1px;
`;

const LabelGoal = styled.div`
  width: 120px;
  margin-right: 12px;
`;

const GoodsDetail = styled.div`
  width: 636px;
  display: flex;
`;

const NameInput = styled.input`
  width: 320px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;
const PriceInput = styled.input`
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  width: 120px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;
const GoalInput = styled.input`
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  width: 120px;
  margin-right: 12px;
  margin-bottom: 12px;
  display: inline-block;
  padding-left: 15px;
  color: ${theme.colors.darkgrey};
`;

const OptionContainer = styled.span``;

const Radio = styled.input`
  accent-color: ${theme.colors.skyblue};
`;

const Input = styled.input`
  margin-top: 12px;
  padding-left: 15px;
  margin: 0 15px;
  border-radius: 5px;
  border: solid 1px ${theme.colors.lightgrey};
  height: 40px;
  font-size: 16px;
  color: ${theme.colors.darkgrey};
  ::placeholder {
    color: ${theme.colors.lightgrey};
  }
`;

const CustomCalendarContainer = styled(CalendarContainer)`
  padding: 10px 0;
  text-align: left;
`;

const DateBox = styled.div`
  padding: 4px;
  border-radius: 5px;
  width: 230px;
  font-size: 14px;
  color: ${theme.colors.darkgrey};
  border: 0.5px solid ${theme.colors.lightgrey};
  text-align: center;
`
