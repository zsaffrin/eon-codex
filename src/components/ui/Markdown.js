import React from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const RenderLink = props =>
  props.href.match(/^(https?:)?\/\//) ? (
    <a href={props.href}>{props.children}</a>
  ) : (
    <Link to={props.href}>{props.children}</Link>
  );

const Markdown = ({ content }) => {
  return <ReactMarkdown source={content} renderers={{ link: RenderLink }} />;
};

export default Markdown;
