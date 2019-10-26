import React from "react";
import ReactMarkdown from "react-markdown/with-html";

const LongTextCell = ({ fieldValue }) => {
  return fieldValue ? "✓" : "∅";
};

export default LongTextCell;
