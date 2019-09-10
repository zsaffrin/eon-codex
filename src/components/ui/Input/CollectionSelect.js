import React from "react";
import { string } from "prop-types";

import { useCollection } from "../../../hooks/firestoreHooks";
import SelectInput from "./SelectInput";

const CollectionSelect = ({ collectionName, ...rest }) => {
  const [collection, collectionLoading] = useCollection(collectionName);

  return <SelectInput choices={collection} {...rest} />;
};
CollectionSelect.propTypes = {
  collectionName: string
};
CollectionSelect.defaultProps = {
  collectionName: " "
};

export default CollectionSelect;
