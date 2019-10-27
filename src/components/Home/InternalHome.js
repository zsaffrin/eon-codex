import React from "react";
import styled from "styled-components";

import { LinkTile, Page } from "../ui";

const LinkGrid = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-auto-flow: column;
  `;
});

const InternalHome = () => {
  return (
    <Page>
      <LinkGrid>
        <div>
          <LinkTile title="Info" to="/info">
            <div>People, places, things</div>
          </LinkTile>
        </div>
      </LinkGrid>
    </Page>
  );
};

export default InternalHome;
