import React from "react";

import { formatDate } from "../../../utils/dateUtils";
import { Breadcrumb, Lookup, Page } from "../../ui";

const ViewPlannedSession = ({ session }) => {
  const { date, location, participants } = session;

  const players = participants
    ? Object.keys(participants).reduce(
        (acc, key) => (key ? [...acc, key] : acc),
        []
      )
    : [];

  return (
    <Page>
      <Breadcrumb
        links={[
          { label: "Home", target: "/" },
          { label: "Sessions", target: "/sessions" }
        ]}
      />
      <h1>Planned Session</h1>
      <div>Scheduled Date: {formatDate(date.toDate())}</div>
      <div>
        Scheduled to play at:{" "}
        <Lookup collection="gamingLocations" recordId={location} noLink />
      </div>
      {players && (
        <div>
          <h2>Expected PCs</h2>
          <div>
            {players.length > 0
              ? players.map(player => (
                  <div key={player}>
                    <Lookup collection="playerCharacters" recordId={player} />
                  </div>
                ))
              : "None"}
          </div>
        </div>
      )}
    </Page>
  );
};

export default ViewPlannedSession;
