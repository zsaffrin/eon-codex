import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";

import { FirebaseContext, UserContext } from "../../../contexts";
import { Loading } from "..";
import Note from "./Note";
import NoteAdder from "./NoteAdder";

const playerHasNote = (notes, playerId) => {
  const playerNote = notes.filter(note => note.player === playerId);
  return playerNote.length > 0 ? true : false;
};

const NoteList = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-gap: ${space.md};
  `;
});

const Notes = () => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const { categoryId, recordId, sessionId } = useParams();
  const [category] = useState(categoryId || "sessions");
  const [record] = useState(recordId || sessionId);
  const [value, loading] = useCollection(
    firebase.db
      .collection("notes")
      .where("collection", "==", category)
      .where("article", "==", record)
  );

  const processedValues = value
    ? value.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    : value;

  return loading ? (
    <Loading />
  ) : (
    <div>
      <NoteList>
        {processedValues.map(note => (
          <Note record={note} key={note.id} />
        ))}
        {!playerHasNote(processedValues, user.uid) && <NoteAdder />}
      </NoteList>
    </div>
  );
};

export default Notes;
