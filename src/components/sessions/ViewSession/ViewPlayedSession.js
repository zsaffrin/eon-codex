import React from "react";

import { formatDate } from "../../../utils/dateUtils";
import { Breadcrumb, Lookup, Page, ShowMarkdown } from "../../ui";

const ViewPlayedSession = ({ session }) => {
  const { date, location, recap } = session;

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
      <div>
        <h2>Recap</h2>
        {recap && recap.length > 0 && <ShowMarkdown content={session.recap} />}
      </div>
    </Page>
  );
};

export default ViewPlayedSession;
