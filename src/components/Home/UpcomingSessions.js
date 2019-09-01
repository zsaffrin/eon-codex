import React from "react";

import { useCollection } from "../../hooks/firestoreHooks";

const UpcomingSessions = () => {
  const [value, loading, error] = useCollection("sessions", [
    "status",
    "==",
    "planned"
  ]);

  return (
    <div>
      <h2>Upcoming Sessions</h2>
      {error && <div>{error}</div>}
      {value ? (
        value.map(({ id, startDate, location, status }) => (
          <div key={id}>
            <h3>{location}</h3>
            <div>{startDate.toDate().toLocaleString("en-US")}</div>
          </div>
        ))
      ) : (
        <div>No sessions planned</div>
      )}
    </div>
  );
};

export default UpcomingSessions;
