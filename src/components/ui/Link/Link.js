import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RRLink)(({ blended, theme }) => {
  const { text } = theme;
  return `
    color: ${blended ? 'inherit' : text.linkColor};
    display: grid;
    align-items: center;
    text-decoration: none;
    &:hover {
      color: ${text.linkHoverColor};
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

export default Link;
