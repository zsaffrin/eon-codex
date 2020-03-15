import React from 'react';
import { useParams } from 'react-router-dom';

import { useDocument } from '../../../hooks/firestoreHooks';
import { Loading, Page } from '../../ui';
import ActionBar from './ActionBar';
import EditRecord from './EditRecord';
import ViewGroup from './ViewGroup';
import ViewPerson from './ViewPerson';
import ViewPlace from './ViewPlace';
import ViewPlayerCharacter from './ViewPlayerCharacter';

const RecordContent = () => {
  const { categoryId, recordId, mode } = useParams();
  const [record, recordLoading] = useDocument(`${categoryId}/${recordId}`);

  if (recordLoading) {
    return <Loading />;
  }
  if (!categoryId) {
    return <Page>Select a category</Page>;
  }
  if (!recordId) {
    return (
      <Page>
        Select a record
      </Page>
    );
  }

  if (mode && (mode === 'add' || mode === 'edit')) {
    return (
      <div>
        <EditRecord addNew={mode === 'add'} />
      </div>
    );
  }

  return (
    <div>
      <ActionBar />
      {categoryId === 'groups' && <ViewGroup record={record} />}
      {categoryId === 'people' && <ViewPerson record={record} />}
      {categoryId === 'places' && <ViewPlace record={record} />}
      {categoryId === 'playerCharacters' && <ViewPlayerCharacter record={record} />}
    </div>
  );
};

export default RecordContent;
