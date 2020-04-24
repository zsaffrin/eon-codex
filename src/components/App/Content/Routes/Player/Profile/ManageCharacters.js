import React, { useState } from 'react';

import { sortBy } from '../../../../../../utils';
import { useCollection, useCurrentUser, useSchemaFields } from '../../../../../../hooks';
import {
  ButtonRow, Button, Loading, Modal, Table,
} from '../../../../../ui';
import { AddRecord, EditRecord } from '../../../shared';

const fieldsToInclude = ['name', 'status'];

const ManageCharacters = () => {
  const { user } = useCurrentUser();
  const [characters, charactersLoading] = useCollection('playerCharacters', ['player', '==', user.uid]);
  const [fields, fieldsLoading] = useSchemaFields('playerCharacters');
  const [addPC, setAddPC] = useState(false);
  const [editPC, setEditPC] = useState(null);

  const toggleAddPC = () => {
    setAddPC(!addPC);
  };
  const toggleEditPC = (pcToEdit) => {
    setEditPC(editPC ? null : pcToEdit);
  };

  const columns = fields ? sortBy(fields, 'displayOrder').reduce((acc, field) => (
    fieldsToInclude.includes(field.key) ? [...acc, field] : acc
  ), []) : [];

  const actions = [
    { label: 'Edit', action: toggleEditPC },
  ];

  return charactersLoading || fieldsLoading ? <Loading /> : (
    <div>
      {addPC && (
        <Modal>
          <AddRecord
            schemaId="playerCharacters"
            onCancel={toggleAddPC}
            onAddSuccess={toggleAddPC}
            imperativeFields={[
              { key: 'player', value: user.uid },
            ]}
          />
        </Modal>
      )}
      {editPC && (
        <Modal>
          <EditRecord
            schemaId="playerCharacters"
            onCancel={toggleEditPC}
            onSaveSuccess={toggleEditPC}
            recordData={editPC}
            imperativeFields={[
              { key: 'player', value: user.uid },
            ]}
          />
        </Modal>
      )}
      <ButtonRow align="start">
        <Button primary small onClick={toggleAddPC}>New PC</Button>
      </ButtonRow>
      <Table columns={columns} entries={characters} actions={actions} />
    </div>
  );
};

export default ManageCharacters;
