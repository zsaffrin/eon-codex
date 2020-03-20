import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { useCurrentUser } from '../../../hooks/authHooks';
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
  const [user, userLoaded] = useCurrentUser();

  if (recordLoading || !userLoaded) {
    return <Loading />;
  }
  if (!user) {
    return <Redirect to="/" />;
  }
  if (!categoryId) {
    return <Page>Select a category</Page>;
  }
  if (!recordId) {
    return (
      <Page>
        {user.canEdit && <ActionBar />}
        Select a record
      </Page>
    );
  }
  if (mode && (mode === 'add' || mode === 'edit')) {
    return user.canEdit ? (
      <div>
        <EditRecord addNew={mode === 'add'} />
      </div>
    ) : <Redirect to={`/info/${categoryId}/${recordId}`} />;
  }

  return (
    <div>
      {user.canEdit && <ActionBar />}
      {categoryId === 'groups' && <ViewGroup record={record} />}
      {categoryId === 'people' && <ViewPerson record={record} />}
      {categoryId === 'places' && <ViewPlace record={record} />}
      {categoryId === 'playerCharacters' && <ViewPlayerCharacter record={record} />}
    </div>
  );
};

export default RecordContent;
