import React, { useContext } from "react";
import styled from "styled-components";

import { UserContext } from "../../../contexts";
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
  const { user } = useContext(UserContext);

  return (
    user && (
      <StyledWrap>
        <Icon name="user" fixedWidth />
        <div>{user.name}</div>
      </StyledWrap>
    )
  );
};

export default Identity;
