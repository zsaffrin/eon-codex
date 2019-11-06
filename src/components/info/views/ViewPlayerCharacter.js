import React from "react";

import { Lookup, Markdown, Page } from "../../ui";

const ViewPlayerCharacter = ({ record }) => {
  const { name, player, bio } = record;

  return (
    <Page>
      <h1>{name}</h1>
      <div>
        Played by <Lookup collection="players" recordId={player} />
      </div>
      <Markdown content={bio} />
    </Page>
  );
};

export default ViewPlayerCharacter;
