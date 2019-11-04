import React from "react";

const MultiselectCell = ({ fieldValue }) => {
  return (
    <div>
      {fieldValue && Object.keys(fieldValue).length
        ? Object.keys(fieldValue).length
        : 0}
    </div>
  );
};

export default MultiselectCell;
