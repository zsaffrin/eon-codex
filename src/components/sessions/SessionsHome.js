import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { useCollection } from "../../hooks/firestoreHooks";
import { Loading } from "../ui";
import { sortBy } from "../../utils/dataUtils";
import { formatDate } from "../../utils/dateUtils";

const SessionsHome = () => {
  const [collection, collectionLoading] = useCollection("sessions");

  return collectionLoading ? (
    <Loading />
  ) : (
    <div>
      <h1>Sessions</h1>
      <ul>
        {sortBy(collection, "date").map(({ id, date, location }) => (
          <li key={id}>
            <Link to={`/sessions/${id}`}>{`${formatDate(date.toDate())}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsHome;