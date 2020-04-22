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
  const { schemaId } = useParams();
  const [schema, schemaLoading] = useSchema(schemaId);
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
          schemaId={schemaId}
          onCancel={toggleAddNewRecord}
          onAddSuccess={toggleAddNewRecord}
          imperativeFields={[
            { key: 'schema', value: schemaId },
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
        schemaId={schemaId}
        collectionId={schema.collection}
        orderKey={schema.defaultSortKey}
      />
    </Page>
  );
};

export default Collection;
