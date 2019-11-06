import React from "react";

import { Markdown, Page } from "../../ui";

const ViewPlace = ({ record }) => {
  const { name, shortDesc, longDesc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <div>{shortDesc}</div>
      <Markdown content={longDesc} />
    </Page>
  );
};

export default ViewPlace;
