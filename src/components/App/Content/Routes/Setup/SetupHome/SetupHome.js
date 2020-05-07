import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import {
  ButtonRow, Button, H, Link, Modal, Page,
} from '../../../../../ui';
import Collections from './Collections';
import { AddRecord } from '../../../shared';

const PageLayout = styled(Page)(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-gap: ${space.lg};
  `;
});
const ContentLayout = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${space.lg};
  `;
});

const SetupHome = () => {
  const { path } = useRouteMatch();
  const [addNew, setAddNew] = useState(false);

  const toggleAddNew = () => {
    setAddNew(!addNew);
  };

  return (
    <PageLayout>
      {addNew && (
      <Modal>
        <AddRecord
          schemaId="schemas"
          onCancel={toggleAddNew}
          onAddSuccess={toggleAddNew}
          imperativeFields={[
            { key: 'schema', value: 'schemas' },
          ]}
        />
      </Modal>
      )}
      <H l={1}>Setup</H>
      <ContentLayout>
        <div>
          <H l={2}>Collections</H>
          <ButtonRow align="start">
            <Button tiny onClick={toggleAddNew}>New</Button>
          </ButtonRow>
          <Collections />
        </div>

        <div>
          <H l={2}>Tools</H>
          <ul>
            <li>
              <Link to={`${path}/tools/updateFieldValues`}>Update Field Values</Link>
            </li>
          </ul>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};

export default SetupHome;
