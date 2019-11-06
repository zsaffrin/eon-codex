import React from "react";

import { Markdown, Page } from "../../ui";

const ViewGroup = ({ record }) => {
  const { name, shortDesc, desc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <div>{shortDesc}</div>
      <Markdown content={desc} />
    </Page>
  );
};

export default ViewGroup;
