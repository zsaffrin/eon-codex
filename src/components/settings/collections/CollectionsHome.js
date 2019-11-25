import React from "react";

import { Breadcrumb, Link, Page } from "../../ui";

const collectionLinks = [
  { label: "Groups", path: "/settings/collection/groups", sort: "name" },
  { label: "Loot", path: "/settings/collection/loot", sort: "name" },
  { label: "Notes", path: "/settings/collection/notes", sort: "collection" },
  { label: "People", path: "/settings/collection/people", sort: "name" },
  { label: "Places", path: "/settings/collection/places", sort: "name" },
  { label: "PCs", path: "/settings/collection/playerCharacters", sort: "name" },
  { label: "Sessions", path: "/settings/collection/sessions", sort: "date" },
  { label: "Things", path: "/settings/collection/things", sort: "name" }
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
