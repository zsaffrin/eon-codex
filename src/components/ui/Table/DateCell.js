import React from "react";

const DateCell = ({ fieldValue }) => {
  return (
    <div>
      {fieldValue &&
        fieldValue.toDate().toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })}
    </div>
  );
};

export default DateCell;
