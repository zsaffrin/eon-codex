import React from "react";

import CollectionCell from "./CollectionCell";
import MenuCell from "./MenuCell";
import DateCell from "./DateCell";

const TableCell = ({ lookup, fieldValue, type }) => {
  if (type === "lookup") {
    return <CollectionCell lookup={lookup} fieldValue={fieldValue} />;
  }
  if (type === "menu") {
    return <MenuCell menu={lookup} fieldValue={fieldValue} />;
  }
  if (type === "datetime") {
    return <DateCell fieldValue={fieldValue} />;
  }

  return <div>{fieldValue}</div>;
};

export default TableCell;
