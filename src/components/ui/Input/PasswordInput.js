import React from "react";

const PasswordInput = ({ id, value, onChange }) => {
  return <input type="password" id={id} value={value} onChange={onChange} />;
};

export default PasswordInput;
