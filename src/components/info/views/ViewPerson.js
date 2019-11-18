import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";

import { UserContext } from "../../../contexts";
import { Link, Markdown, Page } from "../../ui";

const ViewPerson = ({ record }) => {
  const { name, desc } = record;
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
      <Markdown content={desc} />
    </Page>
  );
};

export default ViewPerson;
