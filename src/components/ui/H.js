import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.div(({ centered, compact, theme }) => {
  const { space } = theme;
  return `
    margin: ${compact ? 0 : `0 0 ${space.lg}`};
    ${centered && 'text-align: center;'}
  `;
});

const H = ({
  l, centered, compact, children, ...props
}) => {
  if (l === 1) {
    return (
      <StyledHeading as="h1" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }
  if (l === 2) {
    return (
      <StyledHeading as="h2" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }
  if (l === 3) {
    return (
      <StyledHeading as="h3" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }
  if (l === 4) {
    return (
      <StyledHeading as="h4" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }
  if (l === 5) {
    return (
      <StyledHeading as="h5" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }
  if (l === 6) {
    return (
      <StyledHeading as="h6" centered={centered ? 1 : 0} compact={compact ? 1 : 0} {...props}>
        {children}
      </StyledHeading>
    );
  }

  return false;
};

export default H;
