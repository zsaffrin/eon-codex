import React from "react";

import { Lookup, Markdown } from "../../ui";

const ViewPlayerCharacter = ({ record }) => {
  const { name, player, bio } = record;

  return (
    <div>
      <h1>{name}</h1>
      <div>
        Played by <Lookup collection="players" recordId={player} />
      </div>
      <Markdown content={bio} />
    </div>
  );
};

export default ViewPlayerCharacter;
