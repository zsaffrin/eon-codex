import React from "react";
import ReactMarkdown from "react-markdown";

import { formatDate } from "../../../utils/dateUtils";
import { Breadcrumb, Lookup, Page } from "../../ui";

const ViewPlannedSession = ({ session }) => {
  const { date, location, recap } = session;

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
        <Lookup collection="gamingLocations" recordId={location} />
      </div>
    </Page>
  );
};

export default ViewPlannedSession;
