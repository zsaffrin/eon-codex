import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useSchema } from '../../../../../../hooks';
import {
  Breadcrumb, ButtonRow, Button, H, Link, Loading, Modal, Page,
} from '../../../../../ui';
import { AddRecord, ViewCollection } from '../../../shared';

const TitleRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  justify-content: space-between;
`;

const Collection = () => {
  const { collectionId } = useParams();
  const [schema, schemaLoading] = useSchema(collectionId);
  const [addNewRecord, setAddNewRecord] = useState(false);
  const history = useHistory();

  const toggleAddNewRecord = () => {
    setAddNewRecord(!addNewRecord);
  };

  return schemaLoading ? <Loading /> : (
    <Page>
      {addNewRecord && (
      <Modal>
        <AddRecord
          schemaId={collectionId}
          onCancel={toggleAddNewRecord}
          onAddSuccess={toggleAddNewRecord}
          imperativeFields={[
            { key: 'schema', value: collectionId },
          ]}
        />
      </Modal>
      )}
      <Breadcrumb
        items={[
          <Link to="/setup">Setup</Link>,
          'Manage Collection',
        ]}
      />
      <TitleRow>
        <H l={1} compact>{schema.name}</H>
        <ButtonRow>
          <Button tiny onClick={() => history.push(`/setup/schema/${schema.id}`)}>Schema</Button>
        </ButtonRow>
      </TitleRow>
      <ButtonRow align="start">
        <Button tiny onClick={toggleAddNewRecord}>{`New ${schema.recordName}`}</Button>
      </ButtonRow>
      <ViewCollection
        collectionId={collectionId}
        orderKey={schema.defaultSortKey}
        orderDirection={schema.defaultSortDirection || null}
      />
    </Page>
  );
};

export default Collection;
