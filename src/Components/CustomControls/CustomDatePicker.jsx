// MyDatePicker.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      selected={value ? new Date(value) : null}
      onChange={(date) => onChange(date?.toISOString())}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default CustomDatePicker;
