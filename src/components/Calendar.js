import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar({ onStartDateChange, onEndDateChange }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString(); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }; //날짜 형식 변환

  const onChange = (dates) => {
    const [startDate, endDate] = dates;
    setStartDate(startDate); //start_date: 시작일
    setEndDate(endDate); //end_date: 종료일
    const start_date = formatDate(startDate);
    const end_date = formatDate(endDate);
    onStartDateChange(start_date);
    onEndDateChange(end_date);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
}

export default Calendar;
