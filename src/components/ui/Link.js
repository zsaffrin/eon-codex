import React from "react";
import { Link as RRLink } from "react-router-dom";

const Link = ({ children, ...props }) => {
  return <RRLink {...props}>{children}</RRLink>;
};

export default Link;
