import { bool } from 'prop-types';
import { Link as RRLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(RRLink)(({ active, blended, inline, theme }) => {
  const { links } = theme;

  return `
    background: ${active ? links.backgroundActive : 'inherit'};
    color: ${blended ? 'inherit' : links.color};
    display: ${inline ? 'inline' : 'grid'};
    align-items: center;
    text-decoration: none;

    &:hover {
      color: ${links.hoverColor};
      text-decoration: ${blended ? 'inherit' : 'underline'}
    }
  `;
});

const Link = ({
  active, external, blended, children, inline, to, ...props
}) => (
  <StyledLink
    active={active ? 1 : 0}
    as={external && 'a'}
    blended={blended ? 1 : 0}
    href={external ? to : null}
    inline={inline ? 1 : 0}
    target={external ? '_blank' : null}
    to={to}
    {...props}
  >
    {children}
  </StyledLink>
);
Link.propTypes = {
  active: bool,
  blended: bool,
  external: bool,
};
Link.defaultProps = {
  active: false,
  blended: false,
  external: false,
};

export default Link;
