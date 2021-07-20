import { useCollection as useFirestoreCollection } from 'react-firebase-hooks/firestore';

import useFirebase from './useFirebase';

const useCampaignCollection = (collectionName, campaignId = ' ', query) => {
  const firebase = useFirebase();
  const [value, loading, error] = useFirestoreCollection(
    query
      ? firebase.db
        .collection(collectionName)
        .where('campaign', '==', campaignId)
        .where(query[0], query[1], query[2])
      : firebase.db.collection(collectionName)
        .where('campaign', '==', campaignId)
  );

  const processedValues = value
    ? value.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    : value;

  return [processedValues, loading, error];
};

export default useCampaignCollection;
