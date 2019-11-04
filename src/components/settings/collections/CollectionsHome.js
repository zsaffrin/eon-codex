import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, Page } from "../../ui";

const collectionLinks = [
  { label: "People", path: "/settings/collection/people", sort: "name" },
  { label: "Places", path: "/settings/collection/places", sort: "name" },
  { label: "PCs", path: "/settings/collection/playerCharacters", sort: "name" },
  { label: "Sessions", path: "/settings/collection/sessions", sort: "date" },
  { label: "Groups", path: "/settings/collection/groups", sort: "name" }
];

const CollectionsHome = () => {
  return (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Settings", target: "/settings" }
        ]}
      />
      <h1>Collections</h1>
      <ul>
        {collectionLinks.map(({ label, path, sort }) => (
          <li key={label}>
            <Link
              to={{
                pathname: path,
                state: { sortKey: sort }
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default CollectionsHome;
