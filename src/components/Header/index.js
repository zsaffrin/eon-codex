import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Identity from "./Identity";

const StyledHeader = styled.header`
  border-bottom: 2px solid #8e44ad;
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;
const Title = styled(Link)`
  display: block;
  color: inherit;
  font-weight: bold;
  letter-spacing: 3px;
  text-decoration: none;
  text-transform: uppercase;
`;
const Actions = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title to="/">Eon Codex</Title>
      <Actions>
        <Identity />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
