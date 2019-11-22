import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Markdown, Page } from "../../ui";
import Notes from "./Notes";

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
      <Notes />
    </Page>
  );
};

export default ViewGroup;
