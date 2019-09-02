import React, { useContext, useEffect, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Loading } from "../ui";
import EditPlayerCharacter from "./EditPlayerCharacter";

const PlayerCharacters = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser();
  const [pcs, pcsLoading, pcsError] = useCollection("playerCharacters");
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
    return <EditPlayerCharacter pc={editItem} close={closeEdit} />;
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
