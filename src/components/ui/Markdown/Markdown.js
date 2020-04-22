import React from 'react';
import {
  arrayOf, oneOfType, node, string,
} from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Image from '../Image';
import Link from '../Link';

const RenderLink = ({ href, children }) => (
  href.match(/^(https?:)?\/\//)
    ? <a href={href}>{children}</a>
    : <Link to={href}>{children}</Link>
);
RenderLink.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  href: string,
};
RenderLink.defaultProps = {
  children: [],
  href: '',
};

const Markdown = ({ content }) => (
  <ReactMarkdown
    source={content}
    renderers={{ link: RenderLink, image: Image }}
  />
);
Markdown.propTypes = {
  content: string,
};
Markdown.defaultProps = {
  content: null,
};

export default Markdown;
