import React, { useContext, useEffect, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";

const PlayerCharacters = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser();
  const [pcs, pcsLoading, pcsError] = useCollection("playerCharacters");

  return (
    <div>
      <h1>Player Characters</h1>
      {pcsLoading ? (
        <Loading />
      ) : pcs ? (
        pcs.map(({ id, name }) => (
          <div key={id}>
            <div>{name}</div>
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default PlayerCharacters;
