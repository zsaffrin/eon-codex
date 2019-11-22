import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Lookup, Markdown, Page } from "../../ui";
import Notes from "./Notes";

const ViewPlayerCharacter = ({ record }) => {
  const { name, player, bio } = record;
  const { url } = useRouteMatch();
  const { user } = useContext(UserContext);

  return (
    <Page>
      {user && user.canEdit && (
        <div>
          <Link to={`${url}/edit`}>Edit</Link>
        </div>
      )}
      <h1>{name}</h1>
      <p>
        Played by <Lookup collection="players" recordId={player} noLink />
      </p>
      <Markdown content={bio} />
    </Page>
  );
};

export default ViewPlayerCharacter;
