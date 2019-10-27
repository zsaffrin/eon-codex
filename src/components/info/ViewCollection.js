import React from "react";
import { Link, useParams } from "react-router-dom";

import { useCollection, useSchema } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const ViewCollection = () => {
  const { collectionName } = useParams();
  const [collection, collectionLoading] = useCollection(collectionName);
  const [schema, schemaLoading] = useSchema(collectionName);

  return schemaLoading || collectionLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>{schema.name}</h1>
      <ul>
        {collection.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${collectionName}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCollection;
