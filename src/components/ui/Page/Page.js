import React from 'react';
import {
  arrayOf, bool, node, oneOfType,
} from 'prop-types';
import styled from 'styled-components';

const StyledPage = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.lg};
  `;
});

const CenteredContainer = styled.div`
  max-width: 48em;
  margin-left: auto;
  margin-right: auto;
`;

const Page = ({ children, fullWidth }) => (
  <StyledPage>
    {fullWidth ? children : <CenteredContainer>{children}</CenteredContainer>}
  </StyledPage>
);
Page.propTypes = {
  children: oneOfType([arrayOf(node), node]),
  fullWidth: bool,
};
Page.defaultProps = {
  children: [],
  fullWidth: false,
};

export default Page;
