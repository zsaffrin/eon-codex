import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { useDocument } from "../../../hooks/firestoreHooks";
import { Loading, Lookup, Page } from "../../ui";

const ViewPlayerCharacter = () => {
  const { recordId } = useParams();
  const [record, recordLoading, recordError] = useDocument(
    `playerCharacters/${recordId}`
  );

  return recordLoading ? (
    <Loading />
  ) : (
    <Page>
      <h1>{record.name}</h1>
      <div>
        Played by <Lookup collection="players" recordId={record.player} />
      </div>
      <ReactMarkdown source={record.bio} />
    </Page>
  );
};

export default ViewPlayerCharacter;
