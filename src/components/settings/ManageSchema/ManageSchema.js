import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FirebaseContext } from '../../../contexts/firebaseContext';
import { useSchema } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../ui';
import FieldsManager from './FieldsManager';

const PageSection = styled.div(({ theme }) => {
  const { space } = theme;
  return `
    padding-bottom: ${space.md};
    padding-top: ${space.md};
  `;
});

const ManageSchema = () => {
  const { schemaName } = useParams();
  const [schema, schemaLoading] = useSchema(schemaName);
  const [workingSchema, setWorkingSchema] = useState(null);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    if (!schemaLoading && schema && !workingSchema) {
      setWorkingSchema(schema);
    }
  }, [schemaLoading, schema, workingSchema]);

  const handleFieldChange = (e) => {
    setWorkingSchema({
      ...workingSchema,
      [e.target.id]: e.target.value,
    });
  };

  async function saveSchemaDetails() {
    try {
      const { id, ...rest } = workingSchema;
      const res = await firebase.updateDoc(`schemas/${id}`, rest);
      if (res.status === 'success') {
        // This needs to redirect to the schema front page
        // Good opportunity to use new ReactRouter
      }
      if (res.status === 'error') {
        // Implement message display so this works
        // setMessage(res.result);
      }
    } catch (err) {
      // Implement message display so this works
      // setMessage(err.message);
    }
  }

  const fields = workingSchema ? [
    {
      label: 'API Key',
      content: (
        <Input
          type="text"
          id="apiKey"
          value={workingSchema.apiKey}
          onChange={handleFieldChange}
        />
      ),
    },
    {
      label: 'Name',
      content: (
        <Input
          type="text"
          id="name"
          value={workingSchema.name}
          onChange={handleFieldChange}
        />
      ),
    },
  ] : [];
  fields.push({
    fullRow: true,
    label: 'buttons',
    content: (
      <ButtonRow align="center">
        <Button small onClick={saveSchemaDetails}>
          Save Details
        </Button>
      </ButtonRow>
    ),
  });

  return !workingSchema ? (
    <Loading />
  ) : (
    <Page fullWidth>
      <h1>Manage Schema</h1>
      <PageSection>
        <VerticalList items={fields} />

      </PageSection>
      <PageSection>
        <H l={2}>Fields</H>
        <FieldsManager schemaName={schemaName} />
      </PageSection>
      <PageSection>
        <Button
          primary
          onClick={() => history.push(`/settings/collection/${schemaName}`)}
        >
          Done
        </Button>
      </PageSection>
    </Page>
  );
};

export default ManageSchema;
