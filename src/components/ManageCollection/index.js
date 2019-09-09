import React, { useState } from "react";

import { useCollection, useSchema } from "../../hooks/firestoreHooks";
import { Button, Loading, Table } from "../ui";
import EditRecord from "../EditRecord";

const ManageCollection = ({ collectionName }) => {
  const [collection, collectionLoading] = useCollection(collectionName);
  const [schema, schemaLoading] = useSchema(collectionName);
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

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
        fields={schema.fields}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return collectionLoading || schemaLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>{schema.name}</h1>
      <div>
        <Button onClick={() => addNew()}>New</Button>
      </div>

      {collection && schema ? (
        <Table
          columns={schema.fields}
          entries={collection}
          actions={{ edit }}
        />
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default ManageCollection;
