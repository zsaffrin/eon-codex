import React from "react";

const NumberInput = ({ id, value, onChange }) => {
  return <input type="number" id={id} value={value} onChange={onChange} />;
};

export default NumberInput;
