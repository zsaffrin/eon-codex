import React, { useEffect, useState } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from 'styled-components';

import { useFirebase } from '../../../../../../../../hooks';
import { sortBy } from '../../../../../../../../utils';
import {
  ButtonRow, Button, H, Modal, Page,
} from '../../../../../../../ui';

const StyledTable = styled.table(({ theme }) => {
  const { color, space } = theme;
  return `
    border-collapse: collapse;
    font-size: 0.8rem;
    width: 100%;
    
    & tr {
      border-bottom: 1px solid ${color.lightgray};
    }

    & th {
      text-align: left;
    }

    & td {
      padding: ${space.sm};
    }
  `;
});
const HighlightedText = styled.span(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.primary};
  `;
});
const MutedText = styled.span(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.accent};
    font-style: italic;
  `;
});
const ConfirmContent = styled.span(({ theme }) => {
  const { space } = theme;
  return `
  display: grid;
  font-weight: bold;
  grid-gap: ${space.md};
  justify-items: center;
  padding: ${space.md};
  `;
});
const DangerText = styled.div(({ theme }) => {
  const { color } = theme;
  return `
    color: ${color.danger};
  `;
});

const ActionPreview = ({
  collectionId, recordData, sourceFieldId, sourceFilter, newValue,
}) => {
  const [records, setRecords] = useState([]);
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    setRecords(sourceFieldId && sourceFilter
      ? recordData.filter((record) => (
        record[sourceFieldId] && record[sourceFieldId].includes(sourceFilter)
      ))
      : recordData);
  }, [recordData, sourceFieldId, sourceFilter]);

  const toggleConfirmUpdate = () => {
    setConfirmUpdate(!confirmUpdate);
  };

  const updateRecord = async (docId) => (
    firebase.updateDoc(`${collectionId}/${docId}`, { [sourceFieldId]: newValue })
  );

  const saveUpdatesToRecords = async () => (
    records.map((record) => (
      updateRecord(record.id).then(() => {
        console.info(`Record ${collectionId}/${record.id} updated`);
      })
    ))
  );

  const handleRecordUpdate = async () => {
    console.info(`Updating ${records.length} records...`);
    return saveUpdatesToRecords().then(() => {
      toggleConfirmUpdate();
    });
  };

  const headerLabels = ['Name', 'Current Value', 'New Value'];

  const headerRows = headerLabels.map((label) => (
    <th key={label}>{label}</th>
  ));

  const contentRows = records ? sortBy(records, 'name').map((record) => {
    const { id, name } = record;

    const valueContent = record[sourceFieldId] === newValue
      ? <MutedText>{newValue}</MutedText>
      : <HighlightedText>{newValue}</HighlightedText>;

    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{record[sourceFieldId] || <MutedText>undefined</MutedText>}</td>
        <td>{valueContent}</td>
      </tr>
    );
  }) : [];

  return (
    <div>
      {confirmUpdate && (
        <Modal>
          <Page>
            <H l={2} centered>Confirm Field Update</H>
            <ConfirmContent>
              <div>{`Update ${records.length} records?`}</div>
              <div>{`Field key: ${sourceFieldId}`}</div>
              <div>{`New value: ${newValue}`}</div>
              <DangerText>ARE YOU SURE?</DangerText>
              <div>This is permanent and cannot be undone</div>
            </ConfirmContent>
            <ButtonRow align="center">
              <Button primary onClick={handleRecordUpdate}>Yes, apply updates</Button>
              <Button onClick={toggleConfirmUpdate}>Cancel</Button>
            </ButtonRow>
          </Page>
        </Modal>
      )}
      {records && records.length > 0
        ? (
          <>
            <StyledTable>
              <thead>
                <tr>
                  {headerRows}
                </tr>
              </thead>
              <tbody>
                {contentRows}
              </tbody>
            </StyledTable>
            <ButtonRow align="center">
              <Button primary onClick={toggleConfirmUpdate}>Update Field Values</Button>
            </ButtonRow>
          </>
        )
        : 'No records found. Invalid CollectionId or empty collection'}
    </div>
  );
};

ActionPreview.propTypes = {
  collectionId: string,
  recordData: arrayOf(shape({})),
  sourceFieldId: string,
  sourceFilter: string,
  newValue: string,
};
ActionPreview.defaultProps = {
  collectionId: null,
  recordData: [],
  sourceFieldId: null,
  sourceFilter: null,
  newValue: null,
};

export default ActionPreview;
