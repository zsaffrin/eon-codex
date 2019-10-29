import React from "react";
import styled from "styled-components";

import { LinkTile, Page } from "../ui";

const LinkGrid = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.md};
    grid-template-columns: 1fr;
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
        <div>
          <LinkTile title="Sessions" to="/sessions">
            <div>Gatherings of the rolls</div>
          </LinkTile>
        </div>
        <div>
          <LinkTile title="PCs" to="/info/playerCharacters">
            <div>Adventurous folk</div>
          </LinkTile>
        </div>
      </LinkGrid>
    </Page>
  );
};

export default InternalHome;
