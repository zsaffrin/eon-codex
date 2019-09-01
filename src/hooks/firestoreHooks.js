import { useContext, useState, useEffect } from "react";
import {
  useCollection as useFirestoreCollection,
  useDocument as useFirestoreDocument
} from "react-firebase-hooks/firestore";

import { FirebaseContext } from "../contexts/firebaseContext";

export function useCollection(collectionName, query) {
  const firebase = useContext(FirebaseContext);
  const [value, loading, error] = useFirestoreCollection(
    query
      ? firebase.db
          .collection(collectionName)
          .where(query[0], query[1], query[2])
      : firebase.db.collection(collectionName)
  );

  const processedValues = value
    ? value.docs.map(doc => ({ ...doc.data(), id: doc.id }))
    : value;

  return [processedValues, loading, error];
}

export function useDocument(docQuery) {
  const firebase = useContext(FirebaseContext);
  const [value, loading, error] = useFirestoreDocument(
    firebase.db.doc(docQuery)
  );

  const processedValue = value ? { ...value.data(), id: value.id } : value;

  return [processedValue, loading, error];
}
