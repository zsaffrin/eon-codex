import React from "react";
import { Link } from "react-router-dom";

import { Page } from "../ui";

const CollectionsHome = () => {
  return (
    <Page>
      <h1>Collections</h1>
      <ul>
        <li>
          <Link
            to={{
              pathname: "/settings/collection/places",
              state: { sortKey: "name" }
            }}
          >
            Places
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/settings/collection/sessions",
              state: { sortKey: "date" }
            }}
          >
            Sessions
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/settings/collection/playerCharacters",
              state: { sortKey: "name" }
            }}
          >
            PCs
          </Link>
        </li>
      </ul>
    </Page>
  );
};

export default CollectionsHome;
