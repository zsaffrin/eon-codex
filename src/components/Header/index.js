import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../contexts";
import { Icon, Loading } from "../ui";
import { Identity, LoginStatus } from "./Identity";

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
  const { user, userLoaded } = useContext(UserContext);

  return (
    <StyledHeader>
      <Title to="/">Eon Codex</Title>
      <Actions>
        {!userLoaded ? (
          <Loading />
        ) : (
          <>
            {user && user.canEdit && (
              <div>
                <PlainLink to="/settings">
                  <Icon name="cog" fixedWidth />
                </PlainLink>
              </div>
            )}
            <Identity />
            <LoginStatus />
          </>
        )}
      </Actions>
    </StyledHeader>
  );
};

export default Header;
