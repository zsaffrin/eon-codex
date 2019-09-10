import React from "react";

import { useCollection } from "../../../hooks/firestoreHooks";
import Loading from "../Loading";
import CollectionSelect from "./CollectionSelect";
import TextInput from "./TextInput";

const Input = ({ lookup, type, ...rest }) => {
  if (type === "lookup") {
    return <CollectionSelect collectionName={lookup} {...rest} />;
  }

  return <TextInput {...rest} />;
};

export default Input;
