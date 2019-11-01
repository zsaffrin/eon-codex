import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { LinkTile, Page } from "../ui";

const InfoHome = () => {
  const { url } = useRouteMatch();

  return (
    <Page>
      <h1>Info</h1>
      <LinkTile to={`${url}/places`} title="Places" />
      <LinkTile to={`${url}/people`} title="People" />
    </Page>
  );
};

export default InfoHome;
