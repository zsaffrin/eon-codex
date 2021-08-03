import styled from 'styled-components';

import { useFirebase, useForm, useMessage } from '../../hooks';
import { Button, ButtonRow, VerticalList } from "../ui";

const StyledForm = styled.form(({ theme }) => {
  const { space } = theme;

  return `
    padding: ${space.md};
  `;
});

const EditRecord = ({ onCancel, onSuccess, record, schema }) => {
  const [message, setMessage] = useMessage();
  const [formData, formFields] = useForm(schema.fields.reduce((acc, field) => {
    const { key, name, type, lookup } = field;
    return field.showInEditor
      ? [
          ...acc,
          {
            id: key,
            label: name,
            type,
            lookup,
            defaultValue: record[key],
          },
        ]
      : acc;
  }, []));
  const firebase = useFirebase();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await firebase.updateDoc(`${schema.id}/${record.id}`, formData);
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

export default EditRecord;
