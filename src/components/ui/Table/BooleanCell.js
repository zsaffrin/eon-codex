import React from "react";

const BooleanCell = ({ fieldValue }) => {
  return <div>{fieldValue && "✓"}</div>;
};

export default BooleanCell;
