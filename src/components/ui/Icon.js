import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ name, ...props }) => {
  return <FontAwesomeIcon icon={name} {...props} />;
};

export default Icon;
