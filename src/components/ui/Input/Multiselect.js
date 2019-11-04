import React from "react";
import { string } from "prop-types";

import { useCollection } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";
import MultiselectInput from "./MultiselectInput";

const Multiselect = ({ lookup, ...rest }) => {
  const [collection, collectionLoading] = useCollection(lookup, [
    "active",
    "==",
    "on"
  ]);

  const choices = collection
    ? collection.map(({ id, name }) => ({ id, name }))
    : [];

  return collectionLoading ? (
    <Loading />
  ) : (
    <MultiselectInput choices={choices} {...rest} />
  );
};
Multiselect.propTypes = {
  lookup: string
};
Multiselect.defaultProps = {
  lookup: " "
};

export default Multiselect;
