import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { sortBy } from '../../../utils/dataUtils';
import { useDocument, useFirebase, useSchemaFields } from '../../../hooks/firestoreHooks';
import {
  ButtonRow, Button, H, Input, Loading, Page, VerticalList,
} from '../../ui';

const DeleteConfirmation = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.danger};
    font-weight: bold;
    text-align: center;
  `;
});

const EditSession = () => {
  const { sessionId } = useParams();
  const [deleteMode, setDeleteMode] = useState(false);
  const [sessionData, sessionDataLoading] = useDocument(`sessions/${sessionId}`);
  const [schemaFields, schemaFieldsLoading] = useSchemaFields('sessions');
  const [session, setSession] = useState(null);
  const firebase = useFirebase();
  const history = useHistory();

  useEffect(() => {
    if (!sessionDataLoading && sessionData && !session) {
      setSession(sessionData);
    }
  }, [sessionDataLoading, sessionData, session]);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const handleInputChange = (e) => {
    if (e.isDate) {
      setSession({
        ...session,
        [e.id]: e.value,
      });
    } else if (e.type === 'checkbox') {
      setSession({
        ...session,
        [e.target.id]: e.target.checked,
      });
    } else if (e.isMultiselect) {
      setSession({
        ...session,
        [e.fieldId]: e.value,
      });
    } else if (e.target.type === 'checkbox') {
      setSession({
        ...session,
        [e.target.id]: e.target.checked,
      });
    } else {
      setSession({
        ...session,
        [e.target.id]:
          e.target.type === 'number' ? Number(e.target.value) : e.target.value,
      });
    }
  };

  const saveSession = async () => {
    try {
      const res = await firebase.updateDoc(`sessions/${sessionId}`, session);
      if (res.status === 'success') {
        history.push(`/sessions/${sessionId}`);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSession = async () => {
    try {
      const res = await firebase.deleteDoc(`sessions/${sessionId}`);
      if (res.status === 'success') {
        history.push(`/sessions/${sessionId}`);
      }
      if (res.status === 'error') {
        console.error(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const items = schemaFields ? sortBy(schemaFields, 'displayOrder').reduce((acc, field) => {
    const {
      name, type, key, lookup,
    } = field;
    return [
      ...acc,
      {
        label: name,
        content: (
          <Input
            type={type}
            id={key}
            lookup={lookup}
            value={session[key]}
            onChange={handleInputChange}
          />
        ),
      },
    ];
  }, []) : [];
  if (deleteMode) {
    items.push({
      fullRow: true,
      label: 'confirm',
      content: (
        <DeleteConfirmation>
          Delete this session
          <br />
          ARE YOU SURE?
          <br />
          This is permanent and cannot be undone
        </DeleteConfirmation>
      ),
    });
  }
  items.push({
    fullRow: true,
    label: 'actions',
    content: deleteMode ? (
      <ButtonRow align="center">
        <Button danger onClick={deleteSession}>Yes, Delete</Button>
        <Button onClick={toggleDeleteMode}>No, Cancel</Button>
      </ButtonRow>
    ) : (
      <ButtonRow align="center">
        <Button primary onClick={saveSession}>Save Changes</Button>
        <Button onClick={() => history.push(`/sessions/${sessionId}`)}>Cancel</Button>
        <Button danger onClick={toggleDeleteMode}>Delete</Button>
      </ButtonRow>
    ),
  });

  return schemaFieldsLoading ? <Loading /> : (
    <Page>
      <H l={1}>Edit Session</H>
      <VerticalList items={items} />
    </Page>
  );
};

export default EditSession;
