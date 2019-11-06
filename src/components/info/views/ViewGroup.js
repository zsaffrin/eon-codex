import React from "react";

import { Markdown } from "../../ui";

const ViewGroup = ({ record }) => {
  const { name, shortDesc, desc } = record;

  return (
    <div>
      <h1>{name}</h1>
      <div>{shortDesc}</div>
      <Markdown content={desc} />
    </div>
  );
};

export default ViewGroup;
