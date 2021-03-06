import React from 'react';
import {
  arrayOf, bool, node, oneOfType, string,
} from 'prop-types';
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RRLink)(({ blended, theme }) => {
  const { color, text } = theme;
  return `
    color: ${blended ? 'inherit' : text.linkColor};
    text-decoration: none;
    &:hover {
      color: ${blended ? color.highlight : text.linkHoverColor};
      text-decoration: ${blended ? 'inherit' : 'underline'}
    }
  `;
});

const Link = ({
  external, blended, children, to, ...props
}) => (
  <StyledLink
    as={external && 'a'}
    blended={blended ? 1 : 0}
    href={external ? to : null}
    target={external ? '_blank' : null}
    to={to}
    {...props}
  >
    {children}
  </StyledLink>
);
Link.propTypes = {
  blended: bool,
  external: bool,
  to: string,
  children: oneOfType([arrayOf(node), node]),
};
Link.defaultProps = {
  blended: false,
  external: false,
  to: null,
  children: [],
};

export default Link;
