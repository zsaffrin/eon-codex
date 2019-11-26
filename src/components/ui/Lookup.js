import React from "react";

import { useDocument } from "../../hooks/firestoreHooks";
import { Link, Loading } from "../ui";

const nullValues = [null, undefined, ""];

const Lookup = ({ collection, recordId, noLink }) => {
  const [record, recordLoading] = useDocument(
    `${nullValues.includes(collection) ? " " : collection}/${
      nullValues.includes(recordId) ? " " : recordId
    }`
  );

  if (recordLoading) {
    return <Loading inline />;
  }
  if (noLink) {
    return <span>{record.name}</span>;
  }

  return <Link to={`/info/${collection}/${recordId}`}>{record.name}</Link>;
};

export default Lookup;
