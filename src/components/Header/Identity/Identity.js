import React from "react";
import styled from "styled-components";

import { useCurrentUser } from "../../../hooks/authHooks";
import { Icon, Loading } from "../../ui";

const StyledWrap = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: flex;
    padding-left: ${space.sm};
    padding-right: ${space.sm};
  `;
});

const Identity = () => {
  const [user, userLoaded] = useCurrentUser();

  return !userLoaded ? (
    <Loading />
  ) : (
    <StyledWrap>
      <Icon name="user" fixedWidth />
      <div>{user.name}</div>
    </StyledWrap>
  );
};

export default Identity;
