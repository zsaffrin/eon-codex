import React from "react";

import CollectionCell from "./CollectionCell";
import MenuCell from "./MenuCell";
import DateCell from "./DateCell";
import LongTextCell from "./LongTextCell";
import MultiselectCell from "./MultiselectCell";

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
  if (type === "longtext") {
    return <LongTextCell fieldValue={fieldValue} />;
  }
  if (type === "multiselect") {
    return <MultiselectCell fieldValue={fieldValue} />;
  }

  return <div>{fieldValue}</div>;
};

export default TableCell;
