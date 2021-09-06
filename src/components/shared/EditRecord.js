import styled from 'styled-components';
import { arrayOf, func, shape, string } from 'prop-types';

import { useFirebase, useForm, useMessage, useToggle } from '../../hooks';
import { Button, ButtonRow, Message, VerticalList } from '../ui';

const StyledForm = styled.form(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});
const Centered = styled.div`
  text-align: center;
`;
const CenteredBolded = styled(Centered)`
  font-weight: bold;
`;
const CenteredUpper = styled(Centered)`
  text-transform: uppercase;
`;

const EditRecord = ({ excludeFieldIds, filterFields, onCancel, onDeleteSuccess, onSaveSuccess, record, schema, noDelete }) => {
  const [isDeleting, setIsDeleting] = useToggle();
  const [message, setMessage] = useMessage();
  const [formData, formFields] = useForm(schema.fields.reduce((acc, field) => {
    const { key, name, type, lookup } = field;

    if (
      !field.showInEditor
      || excludeFieldIds.includes(key)
    ) {
      return acc;
    }

    const fieldfilter = filterFields.find(({ fieldKey }) => fieldKey === key);
    let lookupFilterKey, lookupFilterValue = null;
    if (fieldfilter) {
      const { filterKey, value } = fieldfilter;
      lookupFilterKey = filterKey;
      lookupFilterValue = value;
    }

    return [
      ...acc,
      {
        id: key,
        label: name,
        type,
        lookup,
        lookupFilterKey, 
        lookupFilterValue,
        defaultValue: record[key],
      },
    ];
  }, []));
  const firebase = useFirebase();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await firebase.updateDoc(`${schema.id}/${record.id}`, formData);
      switch (res.status) {
        case 'success':
          onSaveSuccess(res.result);
          break;
        case 'error':
          setMessage('error', res.result);
          break;
        default:
          setMessage('error', 'Something went wrong');
          break;
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await firebase.deleteDoc(`${schema.id}/${record.id}`);
      switch (res.status) {
        case 'success':
          onDeleteSuccess(res.result);
          break;
        case 'error':
          setMessage('error', res.result);
          break;
        default:
          setMessage('error', 'Something went wrong');
          break;
      }
    } catch (err) {
      setMessage('error', err, true);
    }
  };
  
  return (
    <StyledForm onSubmit={handleSubmit}>
      {message}
      <VerticalList items={formFields} />
      {isDeleting
        ? (
          <>
            <Message type="error">
              <CenteredUpper>{`Delete this ${schema.recordName}?`}</CenteredUpper>
              <Centered>This is permanent and cannot be undone</Centered>
              <CenteredBolded>ARE YOU SURE?</CenteredBolded>
            </Message>
            <ButtonRow>
              <Button danger onClick={handleDelete}>Yes, Delete</Button>
              <Button onClick={setIsDeleting}>Cancel</Button>
            </ButtonRow>
          </>
        )
        : (
          <ButtonRow>
            <Button primary type="submit">Save Changes</Button>
            <Button onClick={onCancel}>Cancel</Button>
            {!noDelete && <Button onClick={setIsDeleting}>Delete</Button>}
          </ButtonRow>
        )
      }

    </StyledForm>
  );
};
EditRecord.propTypes = {
  excludeFieldIds: arrayOf(string),
  filterFields: arrayOf(shape({
    fieldKey: string,
    filterKey: string,
    value: string,
  })),
  onDeleteSuccess: func,
  onSaveSuccess: func,
};
EditRecord.defaultProps = {
  excludeFieldIds: [],
  filterFields: [],
  onDeleteSuccess: () => {},
  onSaveSuccess: () => {}
};

export default EditRecord;
