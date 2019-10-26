import React from "react";

import CollectionSelect from "./CollectionSelect";
import MenuSelect from "./MenuSelect";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import NumberInput from "./NumberInput";
import DatetimeInput from "./DatetimeInput";
import LongTextInput from "./LongTextInput";

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
  if (type === "datetime") {
    return <DatetimeInput {...rest} />;
  }
  if (type === "longtext") {
    return <LongTextInput {...rest} />;
  }

  return <TextInput {...rest} />;
};

export default Input;
