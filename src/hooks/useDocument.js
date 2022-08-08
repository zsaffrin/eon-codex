import { doc } from 'firebase/firestore';
import { useDocument as useFirestoreDocument } from 'react-firebase-hooks/firestore';

import useFirebase from './useFirebase';

const useDocument = (docQuery) => {
  const { db } = useFirebase();
  const [value, loading, error] = useFirestoreDocument(
    doc(db, docQuery),
  );

  const processedValue = value ? {
    ...value.data(),
    id: value.id,
    exists: value.exists,
  } : value;

  return [processedValue, loading, error];
};

export default useDocument;
