import React, { useState } from 'react';

import { sortBy } from '../../../../../../../utils';
import { useCollection, useCurrentUser } from '../../../../../../../hooks';
import {
  ButtonRow, Button, Loading, Modal,
} from '../../../../../../ui';
import { AddRecord, EditRecord } from '../../../../shared';
import PCList from './PCList';

const ManagePCs = () => {
  const { user } = useCurrentUser();
  const [characters, charactersLoading] = useCollection('playerCharacters', ['player', '==', user.uid]);
  const [sessions, sessionsLoading] = useCollection('sessions');
  const [loot, lootLoading] = useCollection('loot');
  const [addPC, setAddPC] = useState(false);
  const [editPC, setEditPC] = useState(null);

  const toggleAddPC = () => {
    setAddPC(!addPC);
  };
  const toggleEditPC = (pcToEdit) => {
    setEditPC(editPC ? null : pcToEdit);
  };

  return charactersLoading || sessionsLoading || lootLoading ? <Loading /> : (
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
      <PCList
        characters={sortBy(characters, 'name')}
        toggleEdit={toggleEditPC}
        sessions={sessions}
        loot={loot}
      />
    </div>
  );
};

export default ManagePCs;
