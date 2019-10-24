import React from "react";

import CollectionSelect from "./CollectionSelect";
import MenuSelect from "./MenuSelect";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
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
  if (type === "password") {
    return <PasswordInput {...rest} />;
  }

  return <TextInput {...rest} />;
};

export default Input;
