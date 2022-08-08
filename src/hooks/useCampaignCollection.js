import { collection, query, where } from 'firebase/firestore';
import { useCollection as useFirestoreCollection } from 'react-firebase-hooks/firestore';

import useFirebase from './useFirebase';

/**
 * Subscribe to Firestore collection matching a specific Campaign Id
 * @param {string} collectionId Id of the Collection to load
 * @param {string} campaignId Id of the Campaign to filter by
 * @param {array} filterQuery Filter for results [field,operator,value]
 * @returns {[array|bool|Object]} [collection results|loading state|error if present]
 */
const useCampaignCollection = (collectionId, campaignId, filterQuery) => {
  const { db } = useFirebase();
  const collectionRef = collection(db, collectionId);
  const [value, loading, error] = useFirestoreCollection(
    filterQuery
      ? query(
          collectionRef,
          where("campaign", "==", campaignId),
          where(filterQuery[0] || '', filterQuery[1] || '', filterQuery[2] || '')
        )
      : query(
          collectionRef,
          where("campaign", "==", campaignId)
        )
  );

  const processedValues = value
    ? value.docs.map((doc) => ({ ...doc.data(), id: doc.id, collectionId: collectionId }))
    : value;

  return [processedValues, loading, error];
};

export default useCampaignCollection;
