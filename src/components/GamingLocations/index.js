import React, { useState } from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Loading } from "../ui";
import EditRecord from "../EditRecord";

const GamingLocations = () => {
  const [locations, locationsLoading] = useCollection("gamingLocations");
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
        collection="gamingLocations"
        fields={[
          { key: "name", label: "Name", type: "text" },
          { key: "address", label: "Address", type: "text" }
        ]}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return (
    <div>
      <h1>Gaming Locations</h1>
      <div>
        <Button onClick={() => addNew()}>New</Button>
      </div>

      {locationsLoading ? (
        <Loading />
      ) : locations ? (
        locations.map(location => {
          const { id, name } = location;
          return (
            <div key={id}>
              <div>{name}</div>
              <div>
                <Button onClick={() => edit(location)}>Edit</Button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default GamingLocations;
