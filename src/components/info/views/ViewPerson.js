import React from "react";

import { Markdown } from "../../ui";

const ViewPerson = ({ record }) => {
  const { name, desc } = record;

  return (
    <div>
      <h1>{name}</h1>
      <Markdown content={desc} />
    </div>
  );
};

export default ViewPerson;
