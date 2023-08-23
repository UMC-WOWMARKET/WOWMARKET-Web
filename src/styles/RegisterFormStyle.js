import styled from "styled-components";
import theme from "./Theme";

export const RegisterFormContainer = styled.div`
  border: solid 0.5px ${theme.colors.lightgrey};
  width: 800px;
  margin: 0 auto;
  padding: 60px;
  margin-top: 205px;
  color: ${theme.colors.darkgrey};
  font-family: "Pretendard";
`;

export const Title = styled.div`
  border-bottom: 1px solid ${theme.colors.lightgrey};
  width: 800px;
  padding-bottom: 25px;
  margin: auto;
  font-weight: 600;
  font-size: ${theme.fontSizes.headline1};
  text-align: left;
  color: ${theme.colors.darkgrey};
`;

export const InputCell = styled.div`
  width: 800px;
  margin: auto;
  color: ${theme.colors.darkgrey};
`;

export const Label = styled.div`
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

export const InputRegister = styled.input`
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