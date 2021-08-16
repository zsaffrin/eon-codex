import styled from 'styled-components';

import { useFirebase, useForm, useMessage } from '../../hooks';
import { Button, ButtonRow, VerticalList } from "../ui";

const StyledForm = styled.form(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});

const AddRecord = ({ schema, filterFields, imperativeFields, onCancel, onSuccess }) => {
  const [message, setMessage] = useMessage();
  const [formData, formFields] = useForm(schema.fields.reduce((acc, field) => {
    const { key, name, type, lookup } = field;

    if (
      !field.showInEditor
      || imperativeFields.find(({ id }) => id === key)
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

    return ([
      ...acc,
      {
        id: key,
        label: name,
        type,
        lookup,
        lookupFilterKey, 
        lookupFilterValue,
      },
    ]);
  }, schema.specifyId ? [
    {
      id: 'id',
      label: 'Id',
      type: 'text',
    }
  ] : []));
  const firebase = useFirebase();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recordToAdd = imperativeFields
      ? imperativeFields.reduce((acc, { id, value }) => {
        return {
          ...acc,
          [id]: value,
        };
      }, { ...formData })
      : { ...formData };

    try {
      const res = schema.specifyId
        ? await firebase.setDoc(schema.id, recordToAdd.id, recordToAdd)
        : await firebase.addDoc(schema.id, recordToAdd);
      switch (res.status) {
        case 'success':
          onSuccess(res.result);
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
      <ButtonRow>
        <Button primary type="submit">Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </ButtonRow>
    </StyledForm>
  );
};

export default AddRecord;
