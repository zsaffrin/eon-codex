import React from "react";
import styled from "styled-components";

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

const Page = ({ children, fullWidth }) => {
  return (
    <StyledPage>
      {fullWidth ? children : <CenteredContainer>{children}</CenteredContainer>}
    </StyledPage>
  );
};

export default Page;
