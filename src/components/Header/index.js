import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useCurrentUser } from "../../hooks/authHooks";
import { Icon } from "../ui";
import Identity from "./Identity";

const StyledHeader = styled.header`
  border-bottom: 2px solid #8e44ad;
  padding: 5px;
  display: flex;
  align-items: center;
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
  align-items: center;
`;
const PlainLink = styled(Link)`
  text-decoration: none;
`;

const Header = () => {
  const [user, userLoaded] = useCurrentUser();

  return (
    <StyledHeader>
      <Title to="/">Eon Codex</Title>
      <Actions>
        {userLoaded && user && user.canEdit && (
          <div>
            <PlainLink to="/settings">
              <Icon name="cog" fixedWidth />
            </PlainLink>
          </div>
        )}
        <Identity />
      </Actions>
    </StyledHeader>
  );
};

export default Header;
