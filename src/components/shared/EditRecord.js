import styled from 'styled-components';

import { useFirebase, useForm, useMessage, useToggle } from '../../hooks';
import { Button, ButtonRow, VerticalList } from "../ui";

const StyledForm = styled.form(({ theme }) => {
  const { layout } = theme;

  return `
    display: grid;
    grid-gap: ${layout.padding};
  `;
});

const EditRecord = ({ onCancel, onSuccess, record, schema, noDelete }) => {
  const [isDeleting, setIsDeleting] = useToggle();
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

  const handleDelete = async () => {
    try {
      const res = await firebase.deleteDoc(`${schema.id}/${record.id}`);
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
      {isDeleting
        ? (
          <>
            <div>Are you sure?</div>
            <ButtonRow>
              <Button danger onClick={handleDelete}>Yes, Delete</Button>
              <Button onClick={setIsDeleting}>Cancel</Button>
            </ButtonRow>
          </>
        )
        : (
          <ButtonRow>
            <Button primary type="submit">Submit</Button>
            <Button onClick={onCancel}>Cancel</Button>
            {!noDelete && <Button onClick={setIsDeleting}>Delete</Button>}
          </ButtonRow>
        )
      }

    </StyledForm>
  );
};

export default EditRecord;
