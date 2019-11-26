import React from "react";

const LongTextCell = ({ fieldValue }) => {
  return <div>{fieldValue ? "✓" : "∅"}</div>;
};

export default LongTextCell;
