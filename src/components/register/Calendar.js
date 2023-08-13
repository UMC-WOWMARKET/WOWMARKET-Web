import React, { useState } from "react";
import styled from "styled-components";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <CalendarContainer>
      <DateBox>
        {formatDate(startDate)} ~ {formatDate(endDate)}
      </DateBox>
      <br />
      <DatePicker
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
    </CalendarContainer>
  );
}

export default Calendar;

const DateBox = styled.div`
  padding: 4px;
  border: 0.5px solid;
  border-radius: 5px;
  width: 240px;
  margin:0 auto; 
  font-size: 13px;
  color: #646464;
`