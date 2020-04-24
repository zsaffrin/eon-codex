import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useCollection } from '../../../../../../hooks';
import { Loading } from '../../../../../ui';
import CategoryRecordSelector from './CategoryRecordSelector';
import CategoryRecordContent from './CategoryRecordContent';

const CategoryLayout = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    border: 1px solid ${color.lightgray};
    display: grid;
    grid-template-columns: 1fr 3fr;
  `;
});

const InfoCategory = () => {
  const { collectionId, recordId } = useParams();
  const [records, recordsLoading] = useCollection(collectionId || ' ');

  const selectedRecord = records ? records.find((record) => record.id === recordId) : null;

  let content;
  if (collectionId && records) {
    content = (
      <CategoryRecordSelector records={records} />
    );
  }
  if (recordId && selectedRecord) {
    content = (
      <>
        <CategoryRecordSelector records={records} />
        <CategoryRecordContent record={selectedRecord} />
      </>
    );
  }

  return collectionId && recordsLoading
    ? <Loading />
    : (
      <CategoryLayout>
        {content}
      </CategoryLayout>
    );
};

export default InfoCategory;
