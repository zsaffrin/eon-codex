import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useCurrentUser } from "../../hooks/authHooks";
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
  const [user, userLoaded] = useCurrentUser();

  return (
    <StyledHeader>
      <Title to="/">Eon Codex</Title>
      <Actions>
        {userLoaded && user && user.canEdit && (
          <div>
            <Link to="/settings">⚙︎</Link>
          </div>
        )}
        <Identity />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
