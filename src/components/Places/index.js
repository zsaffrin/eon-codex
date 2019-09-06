import React, { useState } from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Loading } from "../ui";
import EditRecord from "../EditRecord";

const Places = () => {
  const [places, placesLoading] = useCollection("places");
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
        collection="places"
        fields={[
          { key: "name", label: "Name", type: "text" },
          { key: "shortDesc", label: "Short Desc", type: "text" }
        ]}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return (
    <div>
      <h1>Places</h1>
      <div>
        <Button onClick={() => addNew()}>New</Button>
      </div>

      {placesLoading ? (
        <Loading />
      ) : places ? (
        places.map(place => {
          const { id, name, shortDesc } = place;
          return (
            <div key={id}>
              <div>{name}</div>
              <div>{shortDesc}</div>
              <div>
                <Button onClick={() => edit(place)}>Edit</Button>
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

export default Places;
