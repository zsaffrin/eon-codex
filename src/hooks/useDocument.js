import { useDocument as useFirestoreDocument } from 'react-firebase-hooks/firestore';

import useFirebase from './useFirebase';

const useDocument = (docQuery) => {
  const firebase = useFirebase();
  const [value, loading, error] = useFirestoreDocument(
    firebase.db.doc(docQuery),
  );

  const processedValue = value ? {
    ...value.data(),
    id: value.id,
    exists: value.exists,
  } : value;

  return [processedValue, loading, error];
};

export default useDocument;
