import React from 'react';
import styled from 'styled-components';

import { Icon, Link } from '../../../ui';

const StyledFooter = styled.div(({ theme }) => {
  const { footer, space } = theme;
  return `
    background: ${footer.background};
    color: ${footer.color};
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: ${space.lg};
    padding: ${space.lg};
    `;
});
const TextContent = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    font-size: 0.8em;
    display: grid;
    grid-gap: ${space.md};
  `;
});

const Footer = () => (
  <StyledFooter>
    <TextContent>
      <div>
        The Eon Codex is a companion app to our homebrewed D&amp;D campaign
      </div>
      <div>
        Campaign design by Dan Surette
        <br />
        Site design by Zach Saffrin
      </div>
    </TextContent>
    <div>
      <Link blended external to="https://github.com/zsaffrin/eon-codex">
        <Icon name={['fab', 'github']} />
      </Link>
    </div>
  </StyledFooter>
);

export default Footer;
