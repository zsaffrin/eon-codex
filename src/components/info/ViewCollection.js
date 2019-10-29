import React from "react";
import { Link, useParams } from "react-router-dom";

import { useCollection, useSchema } from "../../hooks/firestoreHooks";
import { Loading, Page } from "../ui";
import { sortBy } from "../../utils/dataUtils";

const ViewCollection = () => {
  const { collectionName } = useParams();
  const [collection, collectionLoading] = useCollection(collectionName);
  const [schema, schemaLoading] = useSchema(collectionName);

  return schemaLoading || collectionLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>{schema.name}</h1>
      <ul>
        {sortBy(collection, "name").map(({ id, name }) => (
          <li key={id}>
            <Link to={`${collectionName}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </Page>
  );
};

export default ViewCollection;
