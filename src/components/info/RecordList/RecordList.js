import React from 'react';
import { useParams } from 'react-router-dom';

import { sortBy } from '../../../utils/dataUtils';
import { useCollection } from '../../../hooks/firestoreHooks';
import { Loading } from '../../ui';
import RecordListItem from './RecordListItem';

const RecordList = () => {
  const { categoryId, recordId } = useParams();
  const [collection, collectionLoading] = useCollection(categoryId || ' ');

  return collectionLoading ? <Loading /> : (
    <div>
      {sortBy(collection, 'name').map(({ id, name }) => (
        <RecordListItem
          key={id}
          collectionId={categoryId}
          recordId={id}
          label={name}
          active={recordId === id}
        />
      ))}
    </div>
  );
};

export default RecordList;
