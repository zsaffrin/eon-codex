import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Markdown, Notes, Page } from "../../ui";

const ViewGroup = ({ record }) => {
  const { name, shortDesc, desc } = record;
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
      <div>{shortDesc}</div>
      <Markdown content={desc} />
      <div>
        <h2>Player Notes</h2>
        <Notes />
      </div>
    </Page>
  );
};

export default ViewGroup;
