import React, { useState } from 'react';
import { shape, string } from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  Auth, ButtonRow, Button, H, Modal, Page,
} from '../../../../../../ui';
import { EditRecord } from '../../../../shared';
import GroupRecord from './GroupRecord';
import PersonRecord from './PersonRecord';
import PlaceRecord from './PlaceRecord';
import CharacterRecord from './CharacterRecord';

const PageLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.xl};
  `;
});
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryRecordContent = ({ record }) => {
  const { collectionId } = useParams();
  const [editRecord, setEditRecord] = useState(false);

  const toggleEditRecord = () => {
    setEditRecord(!editRecord);
  };

  const { name } = record;

  let content;
  if (collectionId === 'groups') { content = <GroupRecord record={record} />; }
  if (collectionId === 'people') { content = <PersonRecord record={record} />; }
  if (collectionId === 'places') { content = <PlaceRecord record={record} />; }
  if (collectionId === 'playerCharacters') { content = <CharacterRecord record={record} />; }

  return (
    <Page>
      <PageLayout>
        {/* Edit Record */}
        {/* Active when state editSession = true */}
        {editRecord && (
          <Modal>
            <EditRecord
              schemaId={collectionId}
              onCancel={toggleEditRecord}
              onSaveSuccess={toggleEditRecord}
              recordData={record}
            />
          </Modal>
        )}

        {/* Header Row */}
        <HeaderRow>
          <div>
            <H l={1} compact>{name}</H>
          </div>
          <ButtonRow>
            <Auth level={3}>
              <Button small onClick={toggleEditRecord}>Edit</Button>
            </Auth>
          </ButtonRow>
        </HeaderRow>

        {/* Content */}
        {content}
      </PageLayout>

    </Page>
  );
};

CategoryRecordContent.propTypes = {
  record: shape({
    name: string,
  }),
};
CategoryRecordContent.defaultProps = {
  record: {
    name: '',
  },
};

export default CategoryRecordContent;
