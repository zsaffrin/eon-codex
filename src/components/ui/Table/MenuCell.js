import React from "react";

import { useDocument } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";

const MenuCell = ({ menu, fieldValue }) => {
  const [record, recordLoading] = useDocument(`menus/${menu}`);
  const choiceEntry = record
    ? record.options.find(option => option.key === fieldValue)
    : {};

  return recordLoading || !choiceEntry ? (
    <Loading />
  ) : (
    <div>{choiceEntry.label}</div>
  );
};

export default MenuCell;
