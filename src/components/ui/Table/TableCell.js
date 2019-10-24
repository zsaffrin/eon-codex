import React from "react";

import CollectionCell from "./CollectionCell";
import MenuCell from "./MenuCell";

const TableCell = ({ lookup, fieldValue, type }) => {
  if (type === "lookup") {
    return <CollectionCell lookup={lookup} fieldValue={fieldValue} />;
  }
  if (type === "menu") {
    return <MenuCell menu={lookup} fieldValue={fieldValue} />;
  }
  if (type === "datetime") {
    return <div>{fieldValue.toDate().toLocaleString("en-US")}</div>;
  }

  return <div>{fieldValue}</div>;
};

export default TableCell;
