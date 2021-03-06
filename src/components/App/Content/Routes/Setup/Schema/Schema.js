import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useSchema, useSchemaFields } from '../../../../../../hooks';
import { sortBy } from '../../../../../../utils';
import {
  Breadcrumb, ButtonRow, Button, H, Link, Loading, Modal, Page, VerticalList,
} from '../../../../../ui';
import ManageSchemaFields from './ManageSchemaFields';
import { EditRecord } from '../../../shared';

const SchemaLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.xl};
  `;
});
const TitleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: space-between;
`;

const Schema = () => {
  const { schemaId } = useParams();
  const [schema, schemaLoading] = useSchema(schemaId);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields('schemas');
  const [editMode, setEditMode] = useState(false);
  const history = useHistory();

  const toggleEditMode = () => (
    setEditMode(!editMode)
  );

  const rows = schemaFields ? sortBy(schemaFields, 'displayOrder').reduce((acc, field) => [
    ...acc,
    {
      label: field.name,
      content: schema[field.key],
    },
  ], []) : [];
  rows.unshift({
    fullRow: true,
    label: 'actions',
    content: (
      <ButtonRow align="center">
        <Button small onClick={toggleEditMode}>Edit</Button>
      </ButtonRow>
    ),
  });

  return schemaLoading || schemaFieldsLoading ? (
    <Page>
      <Loading />
    </Page>
  ) : (
    <Page>
      {editMode && (
        <Modal>
          <EditRecord
            schemaId="schemas"
            onCancel={toggleEditMode}
            onSaveSuccess={toggleEditMode}
            onDeleteSuccess={() => history.push('/setup')}
            recordData={schema}
          />
        </Modal>
      )}
      <SchemaLayout>
        <div>
          <Breadcrumb
            items={[
              <Link to="/setup">Setup</Link>,
              'Manage Schema',
            ]}
          />
          <TitleRow>
            <H l={1}>{schema.name}</H>
            <ButtonRow>
              <Button tiny onClick={() => history.push(`/setup/collection/${schemaId}`)}>Collection</Button>
            </ButtonRow>
          </TitleRow>
          <VerticalList items={rows} />
        </div>
        <div>
          <H l={2}>Schema Fields</H>
          <ManageSchemaFields />
        </div>
      </SchemaLayout>
    </Page>
  );
};

export default Schema;
