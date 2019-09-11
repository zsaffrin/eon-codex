import React from "react";
import { string } from "prop-types";

import { useCollection } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";
import SelectInput from "./SelectInput";

const CollectionSelect = ({ collectionName, ...rest }) => {
  const [collection, collectionLoading] = useCollection(collectionName);

  return collectionLoading ? (
    <Loading />
  ) : (
    <SelectInput choices={collection} {...rest} />
  );
};
CollectionSelect.propTypes = {
  collectionName: string
};
CollectionSelect.defaultProps = {
  collectionName: " "
};

export default CollectionSelect;
