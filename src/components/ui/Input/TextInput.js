import React from "react";

const TextInput = ({ id, value, onChange }) => {
  return <input type="text" id={id} value={value} onChange={onChange} />;
};

export default TextInput;
