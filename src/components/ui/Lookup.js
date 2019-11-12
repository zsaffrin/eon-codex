import React from "react";

import { useDocument } from "../../hooks/firestoreHooks";
import { Link, Loading } from "../ui";

const Lookup = ({ collection, recordId, noLink }) => {
  const [record, recordLoading, recordError] = useDocument(
    `${collection}/${recordId}`
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
