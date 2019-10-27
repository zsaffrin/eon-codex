import React from "react";
import styled from "styled-components";

const StyledPage = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding: ${space.lg};
  `;
});

const Page = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

export default Page;
