import React from "react";

import { useDocument } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";

const CollectionCell = ({ fieldValue, lookup }) => {
  const [record, recordLoading] = useDocument(`${lookup}/${fieldValue}`);

  return recordLoading ? <Loading /> : <div>{record && record.name}</div>;
};

export default CollectionCell;
