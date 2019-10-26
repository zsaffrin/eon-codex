import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatetimeInput = ({ id, value, onChange }) => {
  const handleChange = e => {
    const payload = {
      isDate: true,
      id,
      value: e
    };
    onChange(payload);
  };

  return (
    <DatePicker
      id={id}
      selected={value.toDate()}
      dateFormat="MMMM d, yyyy"
      onChange={handleChange}
    />
  );
};

export default DatetimeInput;
