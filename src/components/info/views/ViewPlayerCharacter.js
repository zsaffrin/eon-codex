import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Lookup, Markdown, Page } from "../../ui";

const ViewPlayerCharacter = ({ record }) => {
  const { name, player, bio, info, notes } = record;
  const { url } = useRouteMatch();
  const { user } = useContext(UserContext);

  return (
    <Page>
      {user.canEdit && (
        <div>
          <Link to={`${url}/edit`}>Edit</Link>
        </div>
      )}
      <h1>{name}</h1>
      <p>
        Played by <Lookup collection="players" recordId={player} noLink />
      </p>
      {notes && user.uid === player && (
        <div>
          <h2>My Notes</h2>
          <Markdown content={notes} />
        </div>
      )}
      {info && (
        <div>
          <h2>Info</h2>
          <Markdown content={info} />
        </div>
      )}
      {bio && (
        <div>
          <h2>Backstory</h2>
          <Markdown content={bio} />
        </div>
      )}
    </Page>
  );
};

export default ViewPlayerCharacter;
