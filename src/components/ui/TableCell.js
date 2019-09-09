import React from "react";
import { useDocument } from "../../hooks/firestoreHooks";
import Loading from "./Loading";

const TableCell = ({ lookup, fieldValue, type }) => {
  const [record, recordLoading] = useDocument(
    type === "lookup" ? `${lookup}/${fieldValue}` : "_/_"
  );

  if (type === "lookup") {
    return recordLoading ? <Loading /> : <div>{record && record.name}</div>;
  }
  if (type === "datetime") {
    return <div>{fieldValue.toDate().toLocaleString("en-US")}</div>;
  }

  return <div>{fieldValue}</div>;
};

export default TableCell;
