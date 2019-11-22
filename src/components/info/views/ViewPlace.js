import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Markdown, Page } from "../../ui";
import Notes from "./Notes";

const ViewPlace = ({ record }) => {
  const { name, shortDesc, longDesc } = record;
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
      <p>{shortDesc}</p>
      <Markdown content={longDesc} />
      <Notes />
    </Page>
  );
};

export default ViewPlace;
