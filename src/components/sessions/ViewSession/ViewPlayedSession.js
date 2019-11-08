import React from "react";

import { formatDate } from "../../../utils/dateUtils";
import { Breadcrumb, Lookup, Page, Markdown } from "../../ui";

const ViewPlayedSession = ({ session }) => {
  const { date, location, participants, recap } = session;

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
      <h1>Played Session</h1>
      <div>Date Played: {formatDate(date.toDate())}</div>
      <div>
        Played at: <Lookup collection="gamingLocations" recordId={location} />
      </div>
      {players && (
        <div>
          <h2>Participants</h2>
          <div>
            {players.length > 0
              ? players.map(player => (
                  <div>
                    <Lookup collection="playerCharacters" recordId={player} />
                  </div>
                ))
              : "None"}
          </div>
        </div>
      )}
      <div>
        <h2>Recap</h2>
        {recap && recap.length > 0 && <Markdown content={session.recap} />}
      </div>
    </Page>
  );
};

export default ViewPlayedSession;
