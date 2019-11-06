import React from "react";

import { Markdown } from "../../ui";

const ViewPlace = ({ record }) => {
  const { name, shortDesc, longDesc } = record;

  return (
    <div>
      <h1>{name}</h1>
      <div>{shortDesc}</div>
      <Markdown content={longDesc} />
    </div>
  );
};

export default ViewPlace;
