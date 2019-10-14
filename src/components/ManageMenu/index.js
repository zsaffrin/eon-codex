import React, { useState } from "react";

import { useCollection, useSchema } from "../../hooks/firestoreHooks";
import { Button, Loading, Table } from "../ui";

const ManageMenu = ({ menuName }) => {
  const [menu, menuLoading] = useCollection(menuName);
  const [schema, schemaLoading] = useSchema("menus");

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

export default ManageMenu;
