import React from 'react';
import { useParams } from 'react-router-dom';

import { useDocument } from '../../../hooks/firestoreHooks';
import { Loading, Page } from '../../ui';
import ViewGroup from './ViewGroup';
import ViewPerson from './ViewPerson';
import ViewPlace from './ViewPlace';
import ViewPlayerCharacter from './ViewPlayerCharacter';

const RecordContent = () => {
  const { categoryId, recordId } = useParams();
  const [record, recordLoading] = useDocument(`${categoryId}/${recordId}`);

  if (recordLoading) {
    return <Loading />;
  }
  if (!categoryId) {
    return (
      <Page>
        Select a category
      </Page>
    );
  }
  if (!recordId) {
    return (
      <Page>
        Select a record
      </Page>
    );
  }
  if (categoryId === 'groups') {
    return <ViewGroup record={record} />;
  }
  if (categoryId === 'people') {
    return <ViewPerson record={record} />;
  }
  if (categoryId === 'places') {
    return <ViewPlace record={record} />;
  }
  if (categoryId === 'playerCharacters') {
    return <ViewPlayerCharacter record={record} />;
  }

  return (
    <Page>
      <h1>{record.name}</h1>
      <div>
        No view defined for this category type
      </div>
    </Page>
  );
};

export default RecordContent;
