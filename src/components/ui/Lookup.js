import React from "react";

import { useDocument } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const Lookup = ({ collection, recordId }) => {
  const [record, recordLoading, recordError] = useDocument(
    `${collection}/${recordId}`
  );

  return <span>{recordLoading ? <Loading /> : record.name}</span>;
};

export default Lookup;