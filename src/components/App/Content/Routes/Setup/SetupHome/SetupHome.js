import React, { useState } from 'react';

import {
  ButtonRow, Button, H, Modal, Page,
} from '../../../../../ui';
import Collections from './Collections';
import { AddRecord } from '../../../shared';

const SetupHome = () => {
  const [addNew, setAddNew] = useState(false);

  const toggleAddNew = () => {
    setAddNew(!addNew);
  };

  return (
    <Page>
      {addNew && (
      <Modal>
        <AddRecord
          schemaId="iAdRtEsIZgLhr3DCViIX"
          onCancel={toggleAddNew}
          onAddSuccess={toggleAddNew}
          imperativeFields={[
            { key: 'schema', value: 'iAdRtEsIZgLhr3DCViIX' },
          ]}
        />
      </Modal>
      )}
      <H l={1}>Setup</H>
      <H l={2}>Collections</H>
      <ButtonRow align="start">
        <Button tiny onClick={toggleAddNew}>New</Button>
      </ButtonRow>
      <Collections />
    </Page>
  );
};

export default SetupHome;
