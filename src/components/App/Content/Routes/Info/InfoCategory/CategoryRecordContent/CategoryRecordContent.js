import React, { useState } from 'react';
import { shape, string } from 'prop-types';
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
  const [editRecord, setEditRecord] = useState(false);

  const toggleEditRecord = () => {
    setEditRecord(!editRecord);
  };

  const { name, schema } = record;

  let content;
  if (schema === 'groups') { content = <GroupRecord record={record} />; }
  if (schema === 'people') { content = <PersonRecord record={record} />; }
  if (schema === 'places') { content = <PlaceRecord record={record} />; }
  if (schema === 'playerCharacters') { content = <CharacterRecord record={record} />; }

  return (
    <Page>
      <PageLayout>
        {/* Edit Record */}
        {/* Active when state editSession = true */}
        {editRecord && (
          <Modal>
            <EditRecord
              schemaId={schema}
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
