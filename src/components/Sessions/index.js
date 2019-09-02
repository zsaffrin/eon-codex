import React, { useContext, useEffect, useState } from "react";

import { FirebaseContext } from "../../contexts/firebaseContext";
import { useCurrentUser } from "../../hooks/authHooks";
import { useCollection } from "../../hooks/firestoreHooks";
import { Button, Loading } from "../ui";
import EditRecord from "../EditRecord";

const Sessions = () => {
  const firebase = useContext(FirebaseContext);
  const [user, userLoaded] = useCurrentUser();
  const [sessions, sessionsLoading, sessionsError] = useCollection("sessions");
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
        collection="sessions"
        fields={[{ name: "location" }]}
        existingItem={editItem}
        close={closeEdit}
      />
    );
  }

  return (
    <div>
      <h1>Sessions</h1>
      <div>
        <Button onClick={() => addNew()}>New</Button>
      </div>

      {sessionsLoading ? (
        <Loading />
      ) : sessions ? (
        sessions.map(session => {
          const { id, location, startDate } = session;
          return (
            <div key={id}>
              <div>{location}</div>
              <div>
                {startDate && startDate.toDate().toLocaleString("en-US")}
              </div>
              <div>
                <Button onClick={() => edit(session)}>Edit</Button>
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

export default Sessions;
