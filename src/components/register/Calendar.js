import React, { useState } from "react";
import styled from "styled-components";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import theme from "../../styles/Theme";

function Calendar({ onStartDateChange, onEndDateChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const formatDate = (date) =>
    date
      ? `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}월 ${String(date.getDate()).padStart(2, "0")}일`
      : "----년 --월 --일"; // 화면에 보여줄 날짜 형식 변환

  const formatServerDate = (date) =>
    date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      : ""; // 서버에 보낼 날짜 형식 변환

  const onChange = (dates) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate);
    setEndDate(endDate);
    onStartDateChange(formatServerDate(startDate));
    onEndDateChange(formatServerDate(endDate));
  };

  return (
    <CustomCalendarContainer>
      <DateBox>
        {formatDate(startDate)} ~ {formatDate(endDate)}
      </DateBox>
      <br />
      <StyledDatePicker
        selected={startDate}
        onChange={onChange}
        minDate={new Date()}
        maxDate={new Date(new Date().setMonth(new Date().getMonth() + 2))}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        selectsDisabledDaysInRange
        inline
        showDisabledMonthNavigation
      />
    </CustomCalendarContainer>
  );
}

export default Calendar;

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
const StyledDatePicker = styled(DatePicker)`
`;