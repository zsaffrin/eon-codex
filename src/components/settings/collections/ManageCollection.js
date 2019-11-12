import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useCollection, useSchema } from "../../../hooks/firestoreHooks";
import { sortBy } from "../../../utils/dataUtils";
import { Breadcrumb, Button, Link, Loading, Page, Table } from "../../ui";
import EditRecord from "./EditRecord";

const ManageCollection = ({ filter }) => {
  const { collectionName } = useParams();
  const location = useLocation();

  const [collection, collectionLoading] = useCollection(
    collectionName,
    filter ? [filter.key, "==", filter.value] : null
  );
  const [schema, schemaLoading] = useSchema(collectionName);
  const [fields, fieldsLoading] = useCollection("schemaFields", [
    "schema",
    "==",
    collectionName
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [sortField, setSortField] = useState("id");

  useEffect(() => {
    if (
      location.state &&
      location.state.sortKey &&
      location.state.sortKey !== sortField
    ) {
      setSortField(location.state.sortKey);
    }
  }, [location]);

  const closeEdit = () => {
    setEditItem(null);
    setEditMode(false);
  };
  const edit = item => {
    setEditItem(item);
    setEditMode(true);
  };
  const addNew = () => {
    setEditItem(null);
    setEditMode(true);
  };

  if (editMode) {
    return (
      <EditRecord
        collection={collectionName}
        fields={sortBy(fields, "order")}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return collectionLoading || schemaLoading || fieldsLoading ? (
    <Loading />
  ) : (
    <Page fullWidth>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Settings", target: "/settings" },
          { label: "Collections", target: "/settings/collections" }
        ]}
      />
      <h1>{schema.name}</h1>
      <div>
        <Link to={`/settings/schema/${collectionName}`}>Edit Schema</Link>
      </div>
      <div>
        <Button small primary onClick={() => addNew()}>
          New
        </Button>
      </div>

      {collection && schema ? (
        <Table
          columns={sortBy(fields, "order")}
          entries={sortBy(collection, sortField)}
          actions={{ edit }}
        />
      ) : (
        <div>No data</div>
      )}
    </Page>
  );
};

export default ManageCollection;
