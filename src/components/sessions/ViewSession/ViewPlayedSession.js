import React from "react";

import { formatDate } from "../../../utils/dateUtils";
import { Breadcrumb, Lookup, Loot, Page, Markdown, Notes } from "../../ui";

const ViewPlayedSession = ({ session }) => {
  const { date, location, participants, recap, name } = session;

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
      <h1>{name}</h1>
      <div>Date Played: {formatDate(date.toDate())}</div>
      <div>
        Played at:{" "}
        <Lookup collection="gamingLocations" recordId={location} noLink />
      </div>
      {players && (
        <div>
          <h2>Participants</h2>
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
      <div>
        <h2>Loot</h2>
        <Loot />
      </div>
      <div>
        <h2>Recap</h2>
        {recap && recap.length > 0 && <Markdown content={session.recap} />}
      </div>
      <div>
        <h2>Player Notes</h2>
        <Notes />
      </div>
    </Page>
  );
};

export default ViewPlayedSession;
