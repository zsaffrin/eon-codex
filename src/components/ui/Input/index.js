import React from "react";

import CollectionSelect from "./CollectionSelect";
import MenuSelect from "./MenuSelect";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";

const Input = ({ lookup, type, ...rest }) => {
  if (type === "lookup") {
    return <CollectionSelect collectionName={lookup} {...rest} />;
  }
  if (type === "menu") {
    return <MenuSelect menuName={lookup} {...rest} />;
  }
  if (type === "number") {
    return <NumberInput {...rest} />;
  }

  return <TextInput {...rest} />;
};

export default Input;
