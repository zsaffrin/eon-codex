import React from "react";
import ReactMarkdown from "react-markdown";

const ShowMarkdown = ({ content }) => {
  return <ReactMarkdown source={content} />;
};

export default ShowMarkdown;
