import React, { useState } from "react";

import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Loading } from "../ui";
import EditRecord from "../EditRecord";

const PlayerCharacters = () => {
  const [pcs, pcsLoading] = useCollection("playerCharacters");
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
        collection="playerCharacters"
        fields={[{ key: "name", label: "Name", type: "text" }]}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return (
    <div>
      <h1>Player Characters</h1>
      <div>
        <Button onClick={() => addNew()}>New</Button>
      </div>

      {pcsLoading ? (
        <Loading />
      ) : pcs ? (
        pcs.map(pc => {
          const { id, name } = pc;
          return (
            <div key={id}>
              <div>{name}</div>
              <div>
                <Button onClick={() => edit(pc)}>Edit</Button>
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

export default PlayerCharacters;
