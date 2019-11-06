import React from "react";

import { Markdown, Page } from "../../ui";

const ViewPerson = ({ record }) => {
  const { name, desc } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <Markdown content={desc} />
    </Page>
  );
};

export default ViewPerson;
