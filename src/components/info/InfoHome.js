import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { LinkGrid, LinkTile, Page } from "../ui";

const InfoHome = () => {
  const { url } = useRouteMatch();

  return (
    <Page>
      <h1>Info</h1>
      <LinkGrid>
        <LinkTile to={`${url}/places`} title="Places" />
        <LinkTile to={`${url}/people`} title="People" />
        <LinkTile to={`${url}/groups`} title="Groups and Guilds" />
        <LinkTile to={`${url}/playerCharacters`} title="PCs" />
      </LinkGrid>
    </Page>
  );
};

export default InfoHome;
